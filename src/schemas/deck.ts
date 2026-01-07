import { z } from "astro:content";

export const ColorsSchema = z.enum(["W", "U", "B", "R", "G", "C"]);

export const DeckSchema = z.object({
  id: z.string(),
  event: z.string(),
  date: z.string(),
  player: z.string(),
  commanders: z.array(z.string()),
  colors: z.array(ColorsSchema),
  platform: z.string(),
  url: z.string().url(),
  record: z.string(),
  notes: z.string(),
  image_url: z.array(z.string().url()).optional(),
});

export const DecksDataSchema = z.object({
  updatedAt: z.string(),
  decks: z.array(DeckSchema),
});

export type Colors = z.infer<typeof ColorsSchema>;
export type Deck = z.infer<typeof DeckSchema>;
export type DecksData = z.infer<typeof DecksDataSchema>;
