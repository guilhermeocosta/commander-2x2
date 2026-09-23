# CONTEXT.md: ubiquitous language

This is the shared vocabulary of Commander 2x2: the words players use, the pt-BR words on the site, and the names in the code. When you name something in code, use the **In code** column. When you write UI copy, use the **Term (pt-BR)** column.

The source of truth for the format rules is [`src/content/regras/index.md`](src/content/regras/index.md). This file only summarizes them.

## Watch out: "partner" means two things

- **Partner (the keyword)** is a Magic ability that lets two legendary creatures share the command zone. Wherever the banlist, the FAQ or the code says "Partner", it means the keyword.
- **Your teammate** is your **dupla** (or _aliado_, ally). Never call a teammate a "partner" in code or copy; use `teammate`/`team` in English identifiers and _dupla_ in pt-BR.

## The format

Commander 2x2 is regular Commander (EDH) played two-versus-two, with teams re-drawn every round.

| Term (pt-BR)       | English          | In code | Meaning                                                                                                                                          |
| ------------------ | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Commander 2x2      | —                | —       | The format itself. Inspired by the Bazar de Bagdá format of the same name, with changes to make it more accessible.                              |
| Dupla              | Team             | —       | Two players on the same side **for one round**. Teams are not fixed across a tournament.                                                         |
| Aliado             | Ally / teammate  | —       | Your teammate. Effects that target "opponents" don't affect them. Effects that say "you" don't cover them.                                       |
| Oponente           | Opponent         | —       | Each player on the other team is a separate opponent, so "each opponent" effects hit both.                                                       |
| Mesa               | Table / pod      | —       | Four players, two teams, teammates in opposite corners. Turn order is **A1 – B1 – A2 – B2**.                                                     |
| Rodada             | Round            | —       | One game. Teams are drawn by pairing the first-listed player of table 1 with the first-listed player of table 2, and so on.                      |
| Bye / mesa 1×1     | Bye / 1v1 table  | —       | When the player count isn't a multiple of 4: one table may play 1v1 (20 life, best of 3) and/or one player gets a bye.                           |
| Vida compartilhada | Shared life      | —       | The team's life total, starting at **40**. Each player takes damage individually, but it comes off the shared total.                             |
| Dano de comandante | Commander damage | —       | Lethal at **25**, counting the combined damage of all of the team's commanders.                                                                  |
| Veneno / infect    | Poison counters  | —       | A player loses at **10** poison counters, or the team loses when its players have **15** combined.                                               |
| Mulligan           | Mulligan         | —       | Standard **London Mulligan** with **no free mulligan**.                                                                                          |
| Comunicação        | Communication    | —       | Teammates may only communicate **publicly**. Private communication is forbidden. Resources (mana, hand, permanents, graveyard) are never shared. |
| Vitória / derrota  | Win / loss       | —       | The team loses at 0 shared life. Any individual win or loss condition (empty library, "you win the game") applies to the whole team.             |
| Proxy              | Proxy            | —       | Not allowed. Only official, tournament-legal cards.                                                                                              |

## Events

| Term (pt-BR)        | English         | In code                     | Meaning                                                                                                                                 |
| ------------------- | --------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Evento / torneio    | Event           | `events[]` in `events.json` | One tournament: `title`, `date`, `time`, `location`, `format`, `entryFee`, `description`.                                               |
| Regular             | Regular event   | `title`                     | A tournament with player-built decks ("Regular Commander 2x2").                                                                         |
| Pre-Cons            | Precon event    | `title`                     | A tournament played with preconstructed decks ("Commander 2x2 - Pre-Cons").                                                             |
| Formato (do evento) | Event structure | `format`                    | How the event runs, e.g. "3 rodadas fixas" (3 fixed rounds). **Not** the game format.                                                   |
| Local               | Venue           | `location`                  | Store and city, e.g. "Medieval Cards - São Paulo".                                                                                      |
| Inscrição           | Entry fee       | `entryFee`                  | A display string, e.g. "R$ 30,00".                                                                                                      |
| Próximos / Passados | Upcoming / Past | `splitEvents()`             | Split by comparing `date` with **today in São Paulo** at build time. The event day counts as upcoming. Updates only on the next deploy. |

## Decks

Decks come from `src/data/decks.json` and are validated by `DeckSchema` in [`src/schemas/deck.ts`](src/schemas/deck.ts).

| Term (pt-BR)      | English        | In code                | Meaning                                                                                                                     |
| ----------------- | -------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Deck / decklist   | Deck           | `Deck`                 | A list that did well at an event. **Only decks with at least two wins are published.**                                      |
| Comandante        | Commander      | `commanders: string[]` | The card name(s) in the command zone. An array because of pairs (Partner with, Background, etc.).                           |
| Identidade de cor | Color identity | `colors: Colors[]`     | `W` white, `U` blue, `B` black, `R` red, `G` green, `C` colorless.                                                          |
| Campanha          | Record         | `record`               | `"wins-losses-draws"`, e.g. `"2-1-0"`. Events have 3 rounds, so `"3-0-0"` is undefeated.                                    |
| Plataforma        | Platform       | `platform`             | Where the list is hosted. Currently always `archidekt`.                                                                     |
| Evento (do deck)  | Event label    | `event`                | `"YYYY-MM-DD — <Venue>"`, e.g. `"2026-08-15 — medieval"`.                                                                   |
| —                 | Deck id        | `id`                   | Unique kebab-case: `evt-YYYY-MM-DD-<player>-<deck>`.                                                                        |
| Imagem            | Card image     | `image_url?: string[]` | Scryfall image URL(s) (`cards.scryfall.io/normal/...`). Decks with an image appear in the home page showcase, newest first. |

## Banlist

Banlist data lives in `src/data/banlist.json` and is rendered by `TableBanlist.astro` on `/banlist`.

| Term (pt-BR)           | English             | In code                         | Meaning                                                                                                                                                        |
| ---------------------- | ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fontes                 | Sources             | `sources[]`                     | The lists the format inherits: the official Commander banlist, the Reserved List, Game Changers, generic Partner, plus the format's own list (`#2x2-banlist`). |
| Game Changers          | Game Changers       | —                               | Wizards of the Coast's official list of high-impact Commander cards. All of them are banned here.                                                              |
| Reserved List          | Reserved List       | —                               | Wizards' no-reprint list. Banned here to keep the format accessible.                                                                                           |
| Partner genérico       | Generic Partner     | —                               | Plain "Partner" is banned from the command zone. "Partner with", "Friends forever", "Doctor's companion" and "Choose a Background" are allowed.                |
| Lista própria          | Format banlist      | `entries[]`                     | Cards banned specifically by Commander 2x2.                                                                                                                    |
| Banido                 | Banned              | `status: "banned"`              | The card can't be in the deck at all.                                                                                                                          |
| Banido como comandante | Banned as commander | `status: "banned-as-commander"` | The card can be in the 99 but not in the command zone.                                                                                                         |
| Watchlist              | Watchlist           | `watchlist[]` (with `reason`)   | Cards being monitored for a possible future ban.                                                                                                               |
| Data de vigência       | Effective date      | `effectiveDate`                 | When a ban or watchlist entry took effect.                                                                                                                     |

## Ranking (Hall da Fama)

Ranking data lives in `src/data/leaderboard.json`. The logic is in [`src/schemas/leaderboard.ts`](src/schemas/leaderboard.ts).

| Term (pt-BR)               | English           | In code                            | Meaning                                                                                         |
| -------------------------- | ----------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| Hall da Fama               | Hall of Fame      | `/hall-da-fama`, `LeaderboardData` | The annual ranking.                                                                             |
| Temporada                  | Season            | `year`                             | A calendar year. The ranking starts over each season.                                           |
| Jogador                    | Player            | `Player` (`id`, `name`, `avatar`)  | `id` is kebab-case (`guilherme-costa`). `avatar` is a URL or `null`.                            |
| Participação               | Attendance        | `stats.eventsAttended`             | **+1 point** per event attended.                                                                |
| Vitória / Empate / Derrota | Win / Draw / Loss | `stats.wins` / `draws` / `losses`  | Counted **per round**, not per event. **+3** per win, **+1** per draw, 0 per loss.              |
| Pontuação                  | Score             | `calculateScore()`                 | `eventsAttended × 1 + wins × 3 + draws × 1`.                                                    |
| Desempate                  | Tie-breakers      | `rankPlayers()`                    | Sorted by score, then events attended, then wins (all descending).                              |
| Classificados / Top 4      | Qualified players | first 4 of `rankPlayers()`         | The top 4 qualify for the year-end special event, where they form teams for a final tournament. |
| Pódio                      | Podium            | `LeaderboardPodium.astro`          | Ranks 1–4, shown with Magic rarity icons: Mythic, Rare, Uncommon, Common.                       |

## Site content

| Term (pt-BR)         | English   | In code                             | Meaning                                                                                          |
| -------------------- | --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| Regras               | Rules     | `src/content/regras/index.md`       | The full format rules, rendered on `/regras`.                                                    |
| Changelog            | Changelog | `src/content/changelog/*.mdx`       | One entry per format change (banlist update, rules clarification). Frontmatter: `title`, `date`. |
| Perguntas frequentes | FAQ       | `faqItems` in `src/pages/faq.astro` | Question and answer pairs, hardcoded in the page.                                                |

### Routes

| Route           | Nav label            | Page                           |
| --------------- | -------------------- | ------------------------------ |
| `/`             | —                    | `src/pages/index.astro`        |
| `/regras`       | Regras               | `src/pages/regras.astro`       |
| `/banlist`      | Banlist              | `src/pages/banlist.astro`      |
| `/faq`          | Perguntas frequentes | `src/pages/faq.astro`          |
| `/eventos`      | Eventos              | `src/pages/eventos.astro`      |
| `/hall-da-fama` | Hall da Fama         | `src/pages/hall-da-fama.astro` |
| `/decks`        | Decks                | `src/pages/decks.astro`        |
| `/changelog`    | (not in the nav)     | `src/pages/changelog.astro`    |

The navigation is defined in [`src/config/navigation.ts`](src/config/navigation.ts).
