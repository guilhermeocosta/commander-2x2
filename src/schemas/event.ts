import { z } from "astro/zod";

export const EventSchema = z.object({
  title: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  format: z.string(),
  entryFee: z.string(),
  description: z.string().optional(),
});

export const EventsDataSchema = z.object({
  updatedAt: z.string(),
  events: z.array(EventSchema),
});

export type Event = z.infer<typeof EventSchema>;
export type EventsData = z.infer<typeof EventsDataSchema>;

const SAO_PAULO_DATE = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's calendar date in São Paulo as `YYYY-MM-DD`. */
export function todayInSaoPaulo(now: Date = new Date()): string {
  return SAO_PAULO_DATE.format(now);
}

/**
 * Splits events into upcoming (soonest first) and past (most recent first).
 * Dates are compared as `YYYY-MM-DD` strings, so the event day itself still
 * counts as upcoming, and no timezone conversion can shift it by a day.
 */
export function splitEvents<T extends { date: string }>(
  events: readonly T[],
  today: string = todayInSaoPaulo()
): { upcoming: T[]; past: T[] } {
  const sorted = events.toSorted((a, b) => a.date.localeCompare(b.date));
  return {
    upcoming: sorted.filter((event) => event.date >= today),
    past: sorted.filter((event) => event.date < today).reverse(),
  };
}
