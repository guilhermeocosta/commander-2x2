import { z } from "astro/zod";
import { ClockTime, IsoDate } from "./common";

export const EventSchema = z.object({
  title: z.string(),
  date: IsoDate,
  time: ClockTime,
  location: z.string(),
  format: z.string(),
  entryFee: z.string(),
  description: z.string().optional(),
  // True for the last event of a Hall da Fama season, where the Top 4 play the final.
  hallFinal: z.boolean().optional(),
});

export const EventsDataSchema = z.object({
  updatedAt: IsoDate,
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

/** The event that closes a season with the Hall da Fama final, if it's been scheduled. */
export function findSeasonFinal<T extends { date: string; hallFinal?: boolean }>(
  events: readonly T[],
  season: { startDate: string; endDate: string }
): T | undefined {
  return events.find(
    (event) => event.hallFinal && event.date >= season.startDate && event.date <= season.endDate
  );
}
