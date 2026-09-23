import { z } from "astro/zod";
import { IsoDate, ScryfallImageUrl, uniqueBy } from "./common";

export const ColorsSchema = z.enum(["W", "U", "B", "R", "G", "C"]);

export const DeckSchema = z.object({
  id: z.string(),
  event: z.string(),
  date: IsoDate,
  player: z.string(),
  commanders: z.array(z.string()),
  colors: z.array(ColorsSchema),
  platform: z.string(),
  url: z.url(),
  // wins-losses-draws, e.g. "2-1-0"
  record: z.string().regex(/^\d+-\d+-\d+$/, "Expected wins-losses-draws, e.g. 2-1-0"),
  notes: z.string(),
  image_url: z.array(ScryfallImageUrl).optional(),
});

export const DecksDataSchema = z.object({
  updatedAt: IsoDate,
  decks: z.array(DeckSchema).superRefine(uniqueBy("id")),
});

export type Colors = z.infer<typeof ColorsSchema>;
export type Deck = z.infer<typeof DeckSchema>;
export type DecksData = z.infer<typeof DecksDataSchema>;
