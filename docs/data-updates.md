# Data updates runbook

Most changes to this repo are content updates after a tournament or a banlist announcement. Each recipe below lists the files to touch, the rules the data must follow, and how to check the result. Terms are defined in [CONTEXT.md](../CONTEXT.md).

General rules for every data file in `src/data/`:

- Dates are `YYYY-MM-DD` strings.
- Set the top-level `updatedAt` to today's date whenever you change the file. Only `/hall-da-fama` (`leaderboard.json`) and `/banlist` (`banlist.json`) show it, as "Última atualização". The other files' `updatedAt` isn't displayed, but keep it current as a record.
- **Array order matters for some files.** `/decks` and `/banlist` render their arrays in file order:
  - `decks.json`: newest first, so add new decks **at the top** of `decks`.
  - `banlist.json`: oldest first, so add new items **at the end** of `entries` and `watchlist`.
  - `events.json` and `leaderboard.json` are sorted by the pages (by date and by score), so their order doesn't matter.
- Run `pnpm format` after editing. Prettier normalizes the JSON.
- Use `chore:` as the commit/PR type, e.g. `chore: update leaderboard and decks from 2026-09-12 tournament`.

## After a tournament

### 1. Update the ranking: `src/data/leaderboard.json`

For each player who attended:

- Increment `stats.eventsAttended` by 1.
- Add the player's round results to `stats.wins`, `stats.draws` and `stats.losses`. These count **rounds**, not events: a 2-1 day adds `wins: +2, losses: +1`.

For a first-time player, append an entry:

```json
{
  "id": "firstname-lastname",
  "name": "Firstname Lastname",
  "avatar": null,
  "stats": { "eventsAttended": 1, "wins": 2, "draws": 0, "losses": 1 }
}
```

`id` is kebab-case, ASCII and unique. `avatar` is an image URL or `null`. **Don't** store score or rank: `calculateScore()` and `rankPlayers()` in `src/schemas/leaderboard.ts` compute them.

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

You don't need to change anything: an event moves from "Próximos" to "Passados" automatically with the daily rebuild on the day after its date. Only edit the file if the details changed, e.g. the entry fee.

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

For a precon tournament, use `"title": "Commander 2x2 - Pre-Cons"` and `"description": "Torneio com decks pré-construídos"`. This file has **no schema**, so double-check field names by hand: a typo won't fail the build, it will just render blank.

## Change the banlist: `src/data/banlist.json`

- **Ban a card:** add to the end of `entries` with `card`, a Scryfall `url`, `status` (`"banned"` or `"banned-as-commander"`) and `effectiveDate`.
- **Watch a card:** add to the end of `watchlist` with `card`, `url`, `reason` (in pt-BR) and `effectiveDate`.
- **Promote from the watchlist:** remove the card from `watchlist` and add it to the end of `entries`.
- **Unban:** remove the entry.
- Bump `updatedAt` (shown on `/banlist`), then **add a changelog entry** (see below). Banlist changes are format changes.

This file has **no schema** either.

## Change the rules

1. Edit `src/content/regras/index.md` (in pt-BR). If the change raises a common question, also update `faqItems` in `src/pages/faq.astro`.
2. Add a changelog entry.

## Add a changelog entry: `src/content/changelog/`

Create `src/content/changelog/YYYY-MM-DD-short-slug.mdx`:

```mdx
---
title: "Banlist Update"
date: "2026-08-10"
---

- Ban: **Card Name**
- Watchlist: **Other Card**
- Rationale: one line on why.
```

The `/changelog` page picks up new files automatically and sorts them by `date`.

## Start a new season

At the start of a year, reset `src/data/leaderboard.json`: set `year` to the new year, empty the `players` array, and bump `updatedAt`. If you want to keep last season's ranking, save a copy first. The site only renders one season.

## Verify

1. Run `pnpm build`. Zod validation (`src/data/index.ts`) catches malformed data in any of the JSON files.
2. Run `pnpm dev` and open the affected page: `/hall-da-fama`, `/decks`, `/eventos`, `/banlist` or `/changelog`. Scryfall images may show as broken in dev because of a known dev-only issue; check them on the Vercel preview instead.
3. Open a PR, check the Vercel preview, then squash-merge.
