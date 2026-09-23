import { z } from "astro/zod";
import { IsoDate, uniqueBy } from "./common";

export const BanStatusSchema = z.enum(["banned", "banned-as-commander"]);

export const BanlistEntrySchema = z.object({
  card: z.string(),
  url: z.url(),
  status: BanStatusSchema,
  effectiveDate: IsoDate,
});

export const WatchlistEntrySchema = z.object({
  card: z.string(),
  url: z.url(),
  reason: z.string(),
  effectiveDate: IsoDate,
});

export const BanlistSourceSchema = z.object({
  name: z.string(),
  // Either an external URL or an in-page anchor such as "#2x2-banlist".
  url: z.string(),
  note: z.string().optional(),
});

export const BanlistDataSchema = z
  .object({
    updatedAt: IsoDate,
    sources: z.array(BanlistSourceSchema),
    entries: z.array(BanlistEntrySchema).superRefine(uniqueBy("card")),
    watchlist: z.array(WatchlistEntrySchema).superRefine(uniqueBy("card")),
  })
  .superRefine((data, ctx) => {
    // A card is either banned or watched, never both (promote = move it).
    const banned = new Set(data.entries.map((entry) => entry.card));
    data.watchlist.forEach((entry, index) => {
      if (banned.has(entry.card)) {
        ctx.addIssue({
          code: "custom",
          message: `${entry.card} is in both entries and watchlist`,
          path: ["watchlist", index, "card"],
        });
      }
    });
  });

export type BanStatus = z.infer<typeof BanStatusSchema>;
export type BanlistEntry = z.infer<typeof BanlistEntrySchema>;
export type WatchlistEntry = z.infer<typeof WatchlistEntrySchema>;
export type BanlistSource = z.infer<typeof BanlistSourceSchema>;
export type BanlistData = z.infer<typeof BanlistDataSchema>;
