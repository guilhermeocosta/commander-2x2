# 0001. Static Astro site on Vercel

- **Status:** Accepted
- **Date:** 2025-12-01 (recorded retroactively on 2026-09-23)

## Context

Commander 2x2 needs a public home for its rules, banlist, events, decklists and ranking. A small group of volunteers maintains it with no budget. Content changes a few times a month, mostly after tournaments. There are no user accounts and no interactive features that need a server.

## Decision

Build the site with Astro using static output, and deploy it on Vercel through the `@astrojs/vercel` adapter. Style it with Tailwind CSS and daisyUI. Every page is rendered to HTML at build time.

## Consequences

- Hosting is free and fast, with nothing to operate. Vercel gives every PR a preview deployment.
- The stack is small and approachable for occasional contributors: HTML-like `.astro` components and utility classes.
- Any content change requires a commit and a redeploy. Anything time-based, like the upcoming vs past event split, is only as fresh as the last build.
- Features that need a server (logins, live results, form submissions) would require revisiting this decision, e.g. with on-demand routes, which the Vercel adapter already supports.
