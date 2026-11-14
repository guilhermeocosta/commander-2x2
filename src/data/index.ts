// Single entry point for site data. Each JSON file is parsed with its Zod
// schema once, at build time, so malformed data fails `pnpm build`.
// Pages import from here instead of importing the JSON files directly.
import rawBanlist from "./banlist.json";
import rawChampions from "./champions.json";
import rawDecks from "./decks.json";
import rawEvents from "./events.json";
import rawLeaderboard from "./leaderboard.json";
import { BanlistDataSchema } from "../schemas/banlist";
import { ChampionsDataSchema } from "../schemas/champions";
import { DecksDataSchema } from "../schemas/deck";
import { EventsDataSchema } from "../schemas/event";
import { getCurrentSeason, LeaderboardDataSchema } from "../schemas/leaderboard";

export const banlistData = BanlistDataSchema.parse(rawBanlist);
export const championsData = ChampionsDataSchema.parse(rawChampions);
export const decksData = DecksDataSchema.parse(rawDecks);
export const eventsData = EventsDataSchema.parse(rawEvents);
export const leaderboardData = LeaderboardDataSchema.parse(rawLeaderboard);
export const currentSeason = getCurrentSeason(leaderboardData);

// Every edition of the Hall permanente must point at a season of the ranking.
for (const edition of championsData.editions) {
  if (!leaderboardData.seasons.some((season) => season.id === edition.season)) {
    throw new Error(`champions.json: unknown season "${edition.season}"`);
  }
}
