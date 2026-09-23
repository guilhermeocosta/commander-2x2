import { z } from "astro/zod";

/** A calendar date as `YYYY-MM-DD` (rejects impossible dates like 2026-02-30). */
export const IsoDate = z.iso.date();

/** A 24h clock time as `HH:MM`. */
export const ClockTime = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Expected HH:MM");

/**
 * An `https:` URL. `z.url()` alone accepts any scheme, including
 * `javascript:`, and these values are rendered as `href`/`src`.
 */
export const HttpsUrl = z.url({ protocol: /^https$/, error: "Expected an https:// URL" });

/** An `https:` URL on exactly `host`. */
function httpsUrlOn(host: string, message: string) {
  return z.url({
    protocol: /^https$/,
    hostname: new RegExp(`^${host.replaceAll(".", "\\.")}$`),
    error: message,
  });
}

/** Card image URL. Must be on the only remote host allowed by `image.domains`. */
export const ScryfallImageUrl = httpsUrlOn(
  "cards.scryfall.io",
  "Image must be an https://cards.scryfall.io URL (see image.domains in astro.config.mjs)"
);

/** Card page link. Banlist entries point at the card on Scryfall. */
export const ScryfallCardUrl = httpsUrlOn(
  "scryfall.com",
  "Card URL must be an https://scryfall.com link"
);

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
