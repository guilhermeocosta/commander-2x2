# 0003. Validate data with Zod at build time

- **Status:** Accepted
- **Date:** 2026-01-14 (recorded retroactively on 2026-09-23)

## Context

Because data is hand-edited JSON ([ADR 0002](0002-json-files-as-data-store.md)), a typo or a missing field can quietly break a page. The site is static, so there's no runtime to catch errors. They either fail the build or ship.

## Decision

Describe each data file with a Zod schema in `src/schemas/` (using `z` from `astro/zod`), and call `Schema.parse()` on the imported JSON in the page frontmatter. TypeScript types are derived from the schemas with `z.infer`. Domain logic that works on the data, such as `calculateScore()` and `rankPlayers()`, lives in the same module as its schema.

## Consequences

- Malformed data fails `pnpm build`, and therefore CI and the Vercel deploy, instead of reaching production.
- There is one source of truth for the data shape and the types.
- The coverage gap is known: `decks.json` and `leaderboard.json` are validated, but `events.json` and `banlist.json` aren't yet. Their shapes live only in component `Props` interfaces, and `TableBanlist` types `status` as a plain `string`. Adding schemas for them is the natural next step.
- Validation runs once per page that imports the data. That costs nothing at this scale.
