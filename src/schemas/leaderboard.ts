import { z } from "astro/zod";
import { HttpsUrl, IsoDate, uniqueBy } from "./common";

export const PlayerStatsSchema = z.object({
  eventsAttended: z.number().int().min(0),
  wins: z.number().int().min(0),
  draws: z.number().int().min(0),
  losses: z.number().int().min(0),
});

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: HttpsUrl.nullable(),
  stats: PlayerStatsSchema,
  // Dice result for the last tie-breaker. Only filled when two or more players are still
  // tied on score, events attended and win rate. Higher roll ranks first.
  tiebreakRoll: z.number().int().min(1).optional(),
});

// A season (temporada) has its own ranking, which starts from zero. 2026 was one annual
// season; from 2027 on, each semester is a season of its own with its own final.
export const SeasonSchema = z
  .object({
    // Unique: "2026" for the annual season, "2027-1" for a semester.
    id: z.string().regex(/^\d{4}(-[12])?$/, "Expected YYYY or YYYY-1 / YYYY-2"),
    // Display name, e.g. "2027 · 1º semestre".
    name: z.string(),
    startDate: IsoDate,
    endDate: IsoDate,
    // Points that earn the guaranteed prize (meta). Absent for seasons without one (2026).
    goalPoints: z.number().int().positive().optional(),
    // Reais set aside from each entry fee for the prize pool (pote). Absent when there's no pool.
    potPerEntry: z.number().int().positive().optional(),
    players: z.array(PlayerSchema).superRefine(uniqueBy("id")),
  })
  .refine((season) => season.startDate <= season.endDate, {
    message: "startDate must be on or before endDate",
    path: ["endDate"],
  });

export const LeaderboardDataSchema = z
  .object({
    updatedAt: IsoDate,
    // The season shown on /hall-da-fama.
    currentSeason: z.string(),
    seasons: z.array(SeasonSchema).superRefine(uniqueBy("id")),
  })
  .refine((data) => data.seasons.some((season) => season.id === data.currentSeason), {
    message: "currentSeason must be the id of one of the seasons",
    path: ["currentSeason"],
  });

export type Player = z.infer<typeof PlayerSchema>;
export type PlayerStats = z.infer<typeof PlayerStatsSchema>;
export type Season = z.infer<typeof SeasonSchema>;
export type LeaderboardData = z.infer<typeof LeaderboardDataSchema>;

/** The season the Hall da Fama page shows. The schema guarantees it exists. */
export function getCurrentSeason(data: LeaderboardData): Season {
  return data.seasons.find((season) => season.id === data.currentSeason)!;
}

/** Points per event attended, per round won and per round drawn. */
export const POINTS = { attendance: 1, win: 3, draw: 1 } as const;

/** How the prize pool (pote) is split, in percent. Adds up to 100. */
export const POT_SHARES = { champion: 30, third: 15, fourth: 15, prizes: 10 } as const;

/** Entries in a season: every event attended is one paid entry. */
export function countEntries(players: readonly Player[]): number {
  return players.reduce((total, player) => total + player.stats.eventsAttended, 0);
}

/** The prize pool in reais, or `undefined` for a season without one. */
export function calculatePot(season: Season): number | undefined {
  if (season.potPerEntry === undefined) return undefined;
  return countEntries(season.players) * season.potPerEntry;
}

export function calculateScore(stats: PlayerStats): number {
  return (
    stats.eventsAttended * POINTS.attendance + stats.wins * POINTS.win + stats.draws * POINTS.draw
  );
}

export interface RankedPlayer extends Player {
  rank: number;
  score: number;
  // True when this player shares their rank with someone else (an unresolved tie).
  tied: boolean;
}

export function matchesPlayed(stats: PlayerStats): number {
  return stats.wins + stats.draws + stats.losses;
}

type ScoredPlayer = Player & { score: number };

// Compares two players by the official tie-breakers. Returns 0 when the tie is unresolved.
function compareRanking(a: ScoredPlayer, b: ScoredPlayer): number {
  // 1. Score (descending)
  if (b.score !== a.score) return b.score - a.score;
  // 2. Events attended (descending)
  if (b.stats.eventsAttended !== a.stats.eventsAttended)
    return b.stats.eventsAttended - a.stats.eventsAttended;
  // 3. Win rate: wins / matches played (descending). Cross-multiplied to avoid float error.
  const winRateDiff = b.stats.wins * matchesPlayed(a.stats) - a.stats.wins * matchesPlayed(b.stats);
  if (winRateDiff !== 0) return winRateDiff;
  // 4. Dice (descending). A player without a roll ranks below one who rolled.
  return (b.tiebreakRoll ?? 0) - (a.tiebreakRoll ?? 0);
}

export function rankPlayers(players: Player[]): RankedPlayer[] {
  const sorted = players
    .map((player) => ({ ...player, score: calculateScore(player.stats) }))
    // Unresolved ties are listed by name, so the order of the JSON file never matters.
    .sort((a, b) => compareRanking(a, b) || a.name.localeCompare(b.name, "pt-BR"));

  // Players still tied after every tie-breaker share the same rank (1, 2, 2, 4…).
  const ranks: number[] = [];
  sorted.forEach((player, index) => {
    const tiedWithPrevious = index > 0 && compareRanking(sorted[index - 1], player) === 0;
    ranks.push(tiedWithPrevious ? ranks[index - 1] : index + 1);
  });

  return sorted.map((player, index) => ({
    ...player,
    rank: ranks[index],
    tied: ranks.filter((rank) => rank === ranks[index]).length > 1,
  }));
}
