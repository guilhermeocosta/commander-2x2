# Data updates runbook

Most changes to this repo are content updates after a tournament or a banlist announcement. Each recipe below lists the files to touch, the rules the data must follow, and how to check the result. Terms are defined in [CONTEXT.md](../CONTEXT.md).

General rules for every data file in `src/data/`:

- Dates are `YYYY-MM-DD` strings.
- Set the top-level `updatedAt` to today's date whenever you change the file. Only `/hall-da-fama` (`leaderboard.json`) and `/banlist` (`banlist.json`) show it, as "Última atualização". The other files' `updatedAt` isn't displayed, but the sitemap uses every file's `updatedAt` as the page's `lastmod`, so keep it current.
- **Array order matters for some files.** `/decks` and `/banlist` render their arrays in file order:
  - `decks.json`: newest first, so add new decks **at the top** of `decks`.
  - `banlist.json`: oldest first, so add new items **at the end** of `entries` and `watchlist`.
  - `events.json`, `leaderboard.json` and `champions.json` are sorted by the pages (by date, by score and by final date), so their order doesn't matter.
- Run `pnpm format` after editing. Prettier normalizes the JSON.
- Use `chore:` as the commit/PR type, e.g. `chore: update leaderboard and decks from 2026-09-12 tournament`.

## After a tournament

### 1. Update the ranking: `src/data/leaderboard.json`

Edit the `players` of the season named by `currentSeason` (for example `"2027-1"`). Don't touch the other seasons. For each player who attended:

- Increment `stats.eventsAttended` by 1.
- Add the player's round results to `stats.wins`, `stats.draws` and `stats.losses`. These count **rounds**, not events: a 2-1 day adds `wins: +2, losses: +1`.

For a player new to the season (first-time players, and everyone at the first event of a semester), append an entry:

```json
{
  "id": "firstname-lastname",
  "name": "Firstname Lastname",
  "avatar": null,
  "stats": { "eventsAttended": 1, "wins": 2, "draws": 0, "losses": 1 }
}
```

`id` is kebab-case, ASCII and unique within the season. Reuse the player's `id` from earlier seasons. `avatar` is an image URL or `null`.

The pot (pote) on `/hall-da-fama` updates by itself: it's the sum of `eventsAttended` in the season times `potPerEntry` (R$ 5). If an entry didn't go into the pot, tell whoever maintains the site; the data model has no field for it yet. **Don't** store score or rank: `calculateScore()` and `rankPlayers()` in `src/schemas/leaderboard.ts` compute them.

### 2. Add standout decks: `src/data/decks.json`

Only decks with **at least two wins** get published. Add one object per deck **at the top** of the `decks` array (the file is newest first and `/decks` renders it in file order):

```json
{
  "id": "evt-2026-09-12-firstname-deckname",
  "event": "2026-09-12 — medieval",
  "date": "2026-09-12",
  "player": "Firstname Lastname",
  "commanders": ["Commander Name"],
  "colors": ["U", "R"],
  "platform": "archidekt",
  "url": "https://archidekt.com/decks/…",
  "record": "2-1-0",
  "notes": "",
  "image_url": ["https://cards.scryfall.io/normal/front/…jpg"]
}
```

- `id` must be unique: `evt-<date>-<player>-<deck>`, kebab-case.
- `colors` is the color identity, using only `W U B R G C`.
- `record` is `wins-losses-draws`.
- `commanders` has two names for pairs (Partner with, Background, …).
- `image_url` is optional. It must be a `cards.scryfall.io` URL; other hosts are blocked by `image.domains`. Use the `normal` size. Decks with an image also appear in the home page showcase.
- `notes` is required by the schema; use `""` when there's nothing to say.

### 3. Mark the event as done: `src/data/events.json`

You don't need to change anything: an event moves from "Próximos" to "Passados" automatically on the next deploy after its date. Only edit the file if the details changed, e.g. the entry fee.

## Schedule an event: `src/data/events.json`

Append:

```json
{
  "title": "Regular Commander 2x2",
  "date": "2026-10-10",
  "time": "14:00",
  "location": "Medieval Cards - São Paulo",
  "format": "3 rodadas fixas",
  "entryFee": "R$ 30,00",
  "description": "Torneio regular"
}
```

For a precon tournament, use `"title": "Commander 2x2 - Pre-Cons"` and `"description": "Torneio com decks pré-construídos"`. `date` must be `YYYY-MM-DD` and `time` `HH:MM`, or the build fails.

## Change the banlist: `src/data/banlist.json`

- **Ban a card:** add to the end of `entries` with `card`, a Scryfall `url`, `status` (`"banned"` or `"banned-as-commander"`) and `effectiveDate`.
- **Watch a card:** add to the end of `watchlist` with `card`, `url`, `reason` (in pt-BR) and `effectiveDate`.
- **Promote from the watchlist:** remove the card from `watchlist` and add it to the end of `entries`.
- **Unban:** remove the entry.
- Bump `updatedAt` (shown on `/banlist`).

## Change the rules

Edit `src/content/regras/index.md` (in pt-BR). If the change raises a common question, also update `faqItems` in `src/pages/faq.astro`.

## Hall da Fama seasons

From 2027, each semester is a season. See [ADR 0004](adr/0004-semester-seasons-for-the-hall-da-fama.md) and the [glossary](../CONTEXT.md#ranking-hall-da-fama).

### Schedule a season final: `src/data/events.json`

The final is the last event of the semester (June or December). Add the event as usual and set `"hallFinal": true`, with `"format": "3 rodadas fixas + final do Hall"`. `/hall-da-fama` shows its date as the final date of the season whose dates include it; until then it shows "data a definir". Only one event per season should have `hallFinal`.

### Register a tie-break roll: `src/data/leaderboard.json`

When two or more players are still tied on score, events attended and win rate, and the tie matters (the 4th spot, or the final's order), they roll dice. Add `"tiebreakRoll": <result>` to each tied player in the current season; higher ranks first. A player without a roll ranks below one who rolled. The site never mentions the dice.

### Close a semester and record the final: `src/data/champions.json`

After the final, add one edition (order doesn't matter):

```json
{
  "season": "2027-1",
  "name": "2027 · 1º semestre",
  "finalDate": "2027-06-12",
  "finalists": [
    { "place": 1, "name": "Firstname Lastname", "commanders": ["Commander Name"] },
    { "place": 2, "name": "…", "commanders": ["Partner One", "Partner Two"] },
    { "place": 3, "name": "…", "commanders": ["…"] },
    { "place": 4, "name": "…", "commanders": ["…"] }
  ],
  "goalReached": ["Firstname Lastname"]
}
```

- `season` must be the `id` of a season in `leaderboard.json`, or the build fails.
- `place` 1 and 2 are the champions: the two with most wins in the final, ties broken by the ranking.
- `commanders` is what each finalist played in the final.
- `goalReached` lists who reached the season's `goalPoints`. Use `[]` if nobody did.
- Bump `updatedAt`.

### Start a new season: `src/data/leaderboard.json`

1. Add a season to `seasons`:

   ```json
   {
     "id": "2027-2",
     "name": "2027 · 2º semestre",
     "startDate": "2027-07-01",
     "endDate": "2027-12-31",
     "goalPoints": 35,
     "potPerEntry": 5,
     "players": []
   }
   ```

2. Set `currentSeason` to the new `id` and bump `updatedAt`.
3. Keep the old season in the file. Its ranking is the record of who qualified.

`/hall-da-fama` shows an empty state until the first event of the season is added.

## Verify

1. Run `pnpm build`. Zod validation (`src/data/index.ts`) catches malformed data in any of the JSON files. It also rejects dates that aren't `YYYY-MM-DD`, times that aren't `HH:MM`, records that aren't `wins-losses-draws`, duplicate deck or player `id`s, a `currentSeason` or champions `season` that names no season, duplicate banlist cards (or a card both banned and watched), banlist links outside `https://scryfall.com`, any link or image that isn't `https:`, and card images outside `cards.scryfall.io`.
2. Run `pnpm dev` and open the affected page: `/hall-da-fama`, `/campeoes`, `/decks`, `/eventos`, or `/banlist`. Scryfall images may show as broken in dev because of a known dev-only issue; check them on the Vercel preview instead.
3. Open a PR, check the Vercel preview, then squash-merge.
