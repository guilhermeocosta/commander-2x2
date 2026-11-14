# 0004. Semester seasons for the Hall da Fama

- **Status:** Accepted
- **Date:** 2026-11-08

## Context

Until 2026 the Hall da Fama was one annual ranking: `leaderboard.json` held a `year` and a single list of players. From 2027 on, each semester (January to June, July to December) is an independent season with six events, its own final, its own prize pool (pote) and its own points goal (meta). The site needs to show the current semester while keeping past seasons, and the 2026 annual season has to stay as it was.

## Decision

- `leaderboard.json` holds a list of `seasons`. Each season has an `id` (`2026`, `2027-1`, `2027-2`), a display `name`, `startDate` and `endDate`, its own `players`, and two optional rules: `goalPoints` (the meta) and `potPerEntry` (reais set aside from each entry fee). The top-level `currentSeason` names the season that `/hall-da-fama` shows. It is set by hand, so a season switches when its data is ready, not on a date.
- Players are still stored as per-season totals. Score, rank and tie-breakers are still computed by `rankPlayers()`.
- The pot is derived, not stored: the sum of `eventsAttended` across the season's players is the number of entries, times `potPerEntry`.
- The season's final is an event in `events.json` marked `hallFinal: true` whose date falls inside the season.
- Results of each closed season (champions, Top 4, the final's commanders, who reached the goal) live in a separate file, `champions.json`, rendered on `/campeoes`. That record is permanent and doesn't depend on the ranking data.

## Consequences

- Starting a new season means adding an entry to `seasons` and pointing `currentSeason` at it, instead of wiping the players list. Old rankings stay in the file and in git.
- The pot shown on the site is only as accurate as `eventsAttended`. An entry that didn't pay the fee, or an extra contribution, would need a new field.
- The 2026 season has no `goalPoints` or `potPerEntry`, so the page hides the goal and the pot for it.
