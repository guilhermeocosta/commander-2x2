# Architecture Decision Records

An ADR is a short note that records one significant decision: the context, what was decided, and the consequences. They explain **why** the code looks the way it does, so neither people nor agents undo a deliberate choice by accident, or keep following a choice whose reasons no longer hold.

## When to write one

Write an ADR when a change affects the architecture: hosting, rendering mode, where data lives, a dependency with real weight, or a cross-cutting convention. Small refactors and content updates don't need one.

## How

1. Copy the template below into `NNNN-short-title.md`, using the next number.
2. Open it as part of the PR that makes the change.
3. Never rewrite an accepted ADR. If a decision changes, write a new ADR and set the old one's status to `Superseded by NNNN`.

```markdown
# NNNN. Title

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD

## Context

What problem or force led to this decision?

## Decision

What we decided, stated plainly.

## Consequences

What gets easier, what gets harder, and what we accept as a trade-off.
```

## Index

| ADR                                          | Title                        | Status   |
| -------------------------------------------- | ---------------------------- | -------- |
| [0001](0001-static-astro-site-on-vercel.md)  | Static Astro site on Vercel  | Accepted |
| [0002](0002-json-files-as-data-store.md)     | JSON files as the data store | Accepted |
| [0003](0003-zod-validation-at-build-time.md) | Zod validation at build time | Accepted |
