# Contributing

Thanks for helping keep Commander 2x2 running! This guide covers the technical workflow. For the domain vocabulary, see [CONTEXT.md](CONTEXT.md). For how the site is put together, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Setup

1. **Node:** use the version in `.nvmrc`. With nvm, run `nvm use`.
2. **pnpm:** run `corepack enable`. Corepack picks up the exact pnpm version from `packageManager` in `package.json`. Don't use npm or yarn: the lockfile is `pnpm-lock.yaml`.
3. Install and run:

   ```bash
   pnpm install
   pnpm dev
   ```

4. **Optional:** `cp .env.example .env`. The only variable is the PostHog key, and analytics never load in dev anyway.

If you use VS Code, install the recommended extensions (`.vscode/extensions.json`: Astro, Prettier, ESLint). Format-on-save and ESLint fixes are already configured.

## Branches

Branch off `main` and name the branch `<type>/<short-description>`, using the same types as commits:

```text
feat/hall-of-fame-page
fix/decks-mobile-layout
chore/2026-09-12-leaderboard-updates
chore/deps-astro-7
docs/project-documentation
```

## Commits: Conventional Commits

Commit messages and **PR titles** follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<optional scope>): <subject>
```

- Write the subject in the imperative mood and lowercase, with no trailing period ("add", not "added" or "adds").
- Keep it under about 72 characters. Put the why in the body when it isn't obvious.
- PRs are **squash-merged**, so the **PR title becomes the commit on `main`**. The title is what matters most. This also applies to PRs opened from GitHub's web editor: rename the default "Update decks.json" title before you submit.

Types used in this repo:

| Type          | Use it for                                                                   | Example from history                                          |
| ------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `feat`        | A new page, component or user-visible capability                             | `feat: add hall of fame leaderboard page with ranking system` |
| `fix`         | A bug fix                                                                    | `fix: feature decks mobile & a11y`                            |
| `chore`       | Data and content updates (decks, events, leaderboard, banlist), housekeeping | `chore: update decklists from 2026-01-10 tournament`          |
| `chore(deps)` | Dependency upgrades                                                          | `chore(deps): phase 3 — @lucide/astro 0.577.0 -> 1.41.0`      |
| `docs`        | Documentation only                                                           | `docs: add basic readme documentation`                        |
| `ci`          | CI or deploy configuration                                                   | `ci: add vercel rewrite rule`                                 |
| `build`       | Build tooling                                                                | —                                                             |
| `refactor`    | Code change with no behavior change                                          | —                                                             |

The convention is documented but not enforced by tooling, so reviewers check it.

## Pull requests

1. Keep one concern per PR. A data update and a feature go in separate PRs.
2. Run what CI runs before you push:

   ```bash
   pnpm build && pnpm lint && pnpm format:check && pnpm lint:md
   ```

3. Fill in the [PR template](.github/pull_request_template.md). For UI changes, check the Vercel preview deployment linked on the PR and add screenshots.

## Code style

- Prettier decides formatting. Run `pnpm format`; don't hand-format.
- ESLint must report no errors. `@typescript-eslint/no-explicit-any` is a warning by policy, but avoid `any` in new code.
- User-facing copy is written in **pt-BR**. Identifiers and comments are in English.
- Prefer daisyUI and Tailwind classes over custom CSS, and `@lucide/astro` for icons.
- Validate new data shapes with a Zod schema in `src/schemas/` (see [ADR 0003](docs/adr/0003-zod-validation-at-build-time.md)).

## Recording decisions

If a change affects architecture (a new dependency with real weight, a data source, hosting, a rendering mode), add an ADR in [docs/adr/](docs/adr/README.md) in the same PR.

## Other ways to help

- Report bugs or suggest features in [GitHub issues](https://github.com/guilhermeocosta/commander-2x2/issues).
- Join the community on [Discord](https://discord.gg/Yagy5QfU2s).
- Email [admin@commander2x2.org](mailto:admin@commander2x2.org).
