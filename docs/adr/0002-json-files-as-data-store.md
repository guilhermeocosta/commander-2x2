# 0002. JSON files in the repository as the data store

- **Status:** Accepted
- **Date:** 2025-12-01 (recorded retroactively on 2026-09-23)

## Context

The site shows structured data that changes regularly: decklists, events, the season ranking and the banlist. The volume is small (tens to low hundreds of records per file), and there are only a few editors.

## Decision

Keep all structured data as JSON files in `src/data/`, imported directly by pages at build time. Keep long-form content (rules, changelog) as Markdown and MDX in `src/content/`. Don't use a database or a CMS.

## Consequences

- Git history is the audit trail: every banlist or ranking change is reviewable and revertible.
- Editors can update data through a PR, including from GitHub's web editor, and the PR gets a preview deployment.
- Nothing to host, back up or pay for.
- Editing is manual and error-prone: hand-typed JSON, derived values like scores must not be stored, and `updatedAt` must be bumped by hand. [ADR 0003](0003-zod-validation-at-build-time.md) and [docs/data-updates.md](../data-updates.md) mitigate this.
- If the data volume or the number of editors grows a lot, a headless CMS or a spreadsheet-backed import would be worth reconsidering.
