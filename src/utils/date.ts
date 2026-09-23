/**
 * Formats a `YYYY-MM-DD` date as `DD/MM/YYYY`. Parsed as local midnight so
 * the timezone can't shift it by a day.
 */
export function formatDate(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("pt-BR");
}
