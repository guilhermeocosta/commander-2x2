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

export const LeaderboardDataSchema = z.object({
  updatedAt: IsoDate,
  year: z.number().int(),
  players: z.array(PlayerSchema).superRefine(uniqueBy("id")),
});

export type Player = z.infer<typeof PlayerSchema>;
export type PlayerStats = z.infer<typeof PlayerStatsSchema>;
export type LeaderboardData = z.infer<typeof LeaderboardDataSchema>;

export function calculateScore(stats: PlayerStats): number {
  return stats.eventsAttended * 1 + stats.wins * 3 + stats.draws * 1;
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
