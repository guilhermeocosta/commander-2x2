import { z } from "astro/zod";

export const BanStatusSchema = z.enum(["banned", "banned-as-commander"]);

export const BanlistEntrySchema = z.object({
  card: z.string(),
  url: z.url(),
  status: BanStatusSchema,
  effectiveDate: z.string(),
});

export const WatchlistEntrySchema = z.object({
  card: z.string(),
  url: z.url(),
  reason: z.string(),
  effectiveDate: z.string(),
});

export const BanlistSourceSchema = z.object({
  name: z.string(),
  // Either an external URL or an in-page anchor such as "#2x2-banlist".
  url: z.string(),
  note: z.string().optional(),
});

export const BanlistDataSchema = z.object({
  updatedAt: z.string(),
  sources: z.array(BanlistSourceSchema),
  entries: z.array(BanlistEntrySchema),
  watchlist: z.array(WatchlistEntrySchema),
});

export type BanStatus = z.infer<typeof BanStatusSchema>;
export type BanlistEntry = z.infer<typeof BanlistEntrySchema>;
export type WatchlistEntry = z.infer<typeof WatchlistEntrySchema>;
export type BanlistSource = z.infer<typeof BanlistSourceSchema>;
export type BanlistData = z.infer<typeof BanlistDataSchema>;
