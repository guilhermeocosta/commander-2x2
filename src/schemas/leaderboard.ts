import { z } from "astro:content";

export const PlayerStatsSchema = z.object({
  eventsAttended: z.number().int().min(0),
  wins: z.number().int().min(0),
  draws: z.number().int().min(0),
  losses: z.number().int().min(0),
});

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().url().nullable(),
  stats: PlayerStatsSchema,
});

export const LeaderboardDataSchema = z.object({
  updatedAt: z.string(),
  year: z.number().int(),
  players: z.array(PlayerSchema),
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
}

export function rankPlayers(players: Player[]): RankedPlayer[] {
  return players
    .map((player) => ({
      ...player,
      score: calculateScore(player.stats),
      rank: 0,
    }))
    .sort((a, b) => {
      // Primary: score (descending)
      if (b.score !== a.score) return b.score - a.score;
      // Tie-breaker 1: events attended (descending)
      if (b.stats.eventsAttended !== a.stats.eventsAttended)
        return b.stats.eventsAttended - a.stats.eventsAttended;
      // Tie-breaker 2: wins (descending)
      return b.stats.wins - a.stats.wins;
    })
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }));
}
