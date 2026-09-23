// Single entry point for site data. Each JSON file is parsed with its Zod
// schema once, at build time, so malformed data fails `pnpm build`.
// Pages import from here instead of importing the JSON files directly.
import rawBanlist from "./banlist.json";
import rawDecks from "./decks.json";
import rawEvents from "./events.json";
import rawLeaderboard from "./leaderboard.json";
import { BanlistDataSchema } from "../schemas/banlist";
import { DecksDataSchema } from "../schemas/deck";
import { EventsDataSchema } from "../schemas/event";
import { LeaderboardDataSchema } from "../schemas/leaderboard";

export const banlistData = BanlistDataSchema.parse(rawBanlist);
export const decksData = DecksDataSchema.parse(rawDecks);
export const eventsData = EventsDataSchema.parse(rawEvents);
export const leaderboardData = LeaderboardDataSchema.parse(rawLeaderboard);
