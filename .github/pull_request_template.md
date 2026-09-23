# What and why

<!-- One or two sentences. Link the issue if there is one. -->

## Type

<!-- The PR title must be a Conventional Commit (e.g. `chore: update leaderboard from 2026-09-12`), because it becomes the squash-merge commit. -->

- [ ] `feat`: new page, component or capability
- [ ] `fix`: bug fix
- [ ] `chore`: data or content update, housekeeping, deps
- [ ] `docs` / `ci` / `build` / `refactor`

## Checklist

- [ ] `pnpm build && pnpm lint && pnpm format:check && pnpm lint:md` pass locally
- [ ] Data changed: `updatedAt` bumped in each edited `src/data/*.json`
- [ ] UI changed: checked the Vercel preview and attached screenshots
- [ ] Architecture changed: ADR added in `docs/adr/`
