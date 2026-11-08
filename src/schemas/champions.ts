import { z } from "astro/zod";
import { IsoDate, uniqueBy } from "./common";

export const FinalistSchema = z.object({
  // Final placing: 1 and 2 are the champions, 3 and 4 the other finalists.
  place: z.number().int().min(1).max(4),
  name: z.string(),
  // The commander(s) the player used in the final.
  commanders: z.array(z.string()).min(1),
});

// One closed season of the Hall da Fama, recorded after its final.
export const EditionSchema = z.object({
  // The season id in leaderboard.json, e.g. "2026" or "2027-1".
  season: z.string(),
  name: z.string(),
  finalDate: IsoDate,
  finalists: z.array(FinalistSchema).min(2).max(4).superRefine(uniqueBy("place")),
  // Players who reached the season's points goal (meta). Empty for seasons without one.
  goalReached: z.array(z.string()).default([]),
});

export const ChampionsDataSchema = z.object({
  updatedAt: IsoDate,
  editions: z.array(EditionSchema).superRefine(uniqueBy("season")),
});

export type Finalist = z.infer<typeof FinalistSchema>;
export type Edition = z.infer<typeof EditionSchema>;
export type ChampionsData = z.infer<typeof ChampionsDataSchema>;
