# AGENTS.md

Guidance for coding agents (and humans) working in this repository. Keep this file short; details live in the linked docs.

## What this is

The community hub for **Commander 2x2**, a competitive two-versus-two Magic: The Gathering Commander format played in São Paulo. The site publishes the rules, the banlist, the event calendar, standout decklists, and the annual ranking (Hall da Fama). It is a static Astro site deployed on Vercel. There is no backend: all data lives in JSON and Markdown files in this repo. The UI is in Brazilian Portuguese (pt-BR).

## Commands

```bash
pnpm install         # install deps (pnpm only; Node version from .nvmrc)
pnpm dev             # dev server at http://localhost:4321
pnpm build           # astro check (type-check) + astro build; type errors fail the build
pnpm lint            # eslint (warnings fail too)
pnpm format:check    # prettier (use `pnpm format` to fix)
pnpm lint:md         # markdownlint
```

CI (`.github/workflows/ci.yml`) runs `build`, `lint`, `format:check` and `lint:md` on every PR. Run all four before you open one. The repo has no test suite.

## Repo map

| Path              | What lives there                                                          |
| ----------------- | ------------------------------------------------------------------------- |
| `src/pages/`      | One `.astro` file per route, plus the `sitemap.xml.ts` endpoint           |
| `src/components/` | Presentational Astro components (`BaseLayout.astro` wraps every page)     |
| `src/data/`       | Site data as JSON, plus `index.ts`, which parses and exports it           |
| `src/schemas/`    | Zod schemas and domain logic for the data (scoring and ranking live here) |
| `src/content/`    | Markdown: `regras/` (rules)                                               |
| `src/config/`     | Navigation items                                                          |
| `src/utils/`      | `date.ts` (`formatDate`)                                                  |
| `src/styles/`     | `global.css`: Tailwind v4 + daisyUI plugin and the custom `custom` theme  |
| `src/marketing/`  | Promotional components (Discord banner)                                   |
| `src/assets/`     | Images processed by Astro (rarity icons for the podium)                   |
| `public/`         | Static files served as-is (favicon, logo, OG image, `robots.txt`)         |

## Conventions

- **pnpm only.** The Node version comes from `.nvmrc`, the pnpm version from `packageManager` in `package.json`.
- **Formatting:** Prettier with double quotes, semicolons, width 100, `es5` trailing commas. Don't hand-format; run `pnpm format`.
- **Language:** user-facing copy in pt-BR, code identifiers and comments in English. Domain terms are defined in [CONTEXT.md](CONTEXT.md); use those names.
- **Styling:** prefer daisyUI component classes (`card`, `btn`, `badge`, `table`) and Tailwind utilities over custom CSS. Theme colors are tokens in `src/styles/global.css`.
- **Icons:** `@lucide/astro`.
- **Dependencies:** don't add a runtime dependency without a clear reason. The site is intentionally simple.
- **Commits and PRs:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:` …). PRs are squash-merged, so the PR title becomes the commit message. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Gotchas

- Every data JSON file is parsed with Zod in `src/data/index.ts` at build time, so invalid data fails `pnpm build`. Pages import parsed data from `src/data` (`import { decksData } from "../data"`), never the raw JSON.
- Dates are `YYYY-MM-DD` strings. Render them with `formatDate()` (`src/utils/date.ts`), which keeps them from shifting a day because of the timezone.
- Bump the top-level `updatedAt` whenever you edit a data JSON file. Only `/hall-da-fama` and `/banlist` display it; the sitemap also uses it as `lastmod`.
- Array order matters: `/decks` and `/banlist` render their arrays in file order. `decks.json` is newest first, so add new decks at the top; `banlist.json` is oldest first, so add at the end. Events and the ranking are sorted by the pages.
- Remote images are only allowed from `cards.scryfall.io` (`image.domains` in `astro.config.mjs`). In `pnpm dev`, the `/_image` endpoint returns 500 for them. This is a known dev-only issue; production is fine.
- PostHog analytics only loads in production builds (`import.meta.env.PROD`).
- The FAQ items are hardcoded in `src/pages/faq.astro`, not loaded from Markdown.
- There are no Astro content collections. Rules are imported directly.

## Read next

- [CONTEXT.md](CONTEXT.md): domain glossary (format rules, decks, banlist, ranking)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): stack, data flow, build and deploy
- [docs/data-updates.md](docs/data-updates.md): step-by-step recipes for the most common changes
- [CONTRIBUTING.md](CONTRIBUTING.md): setup, branches, commits, PRs
- [docs/adr/](docs/adr/README.md): why things are the way they are
