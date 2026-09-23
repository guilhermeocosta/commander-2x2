import { z } from "astro/zod";

/** A calendar date as `YYYY-MM-DD` (rejects impossible dates like 2026-02-30). */
export const IsoDate = z.iso.date();

/** A 24h clock time as `HH:MM`. */
export const ClockTime = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Expected HH:MM");

/** Card image URL. Must be on the only remote host allowed by `image.domains`. */
export const ScryfallImageUrl = z
  .url()
  .refine((url) => new URL(url).hostname === "cards.scryfall.io", {
    message: "Image must be hosted on cards.scryfall.io (see image.domains in astro.config.mjs)",
  });

/** Card page link. Banlist entries point at the card on Scryfall. */
export const ScryfallCardUrl = z.url().refine((url) => new URL(url).hostname === "scryfall.com", {
  message: "Card URL must be a scryfall.com link",
});

/** superRefine check that fails when two items share the same `key` value. */
export function uniqueBy<T, K extends keyof T>(key: K) {
  return (items: T[], ctx: z.RefinementCtx<T[]>) => {
    const seen = new Set<T[K]>();
    items.forEach((item, index) => {
      if (seen.has(item[key])) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate ${String(key)}: ${String(item[key])}`,
          path: [index, key as PropertyKey],
        });
      }
      seen.add(item[key]);
    });
  };
}
