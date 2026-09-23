# Commander 2x2

[![Português](https://img.shields.io/badge/lang-pt--BR-green)](README.md)

Welcome to Commander 2x2, a competitive Commander format for teams of two. To learn more about the format, its rules, and how to join us, visit the official website at [commander2x2.org](https://commander2x2.org).

If you're here to learn more about the project's behind-the-scenes, keep reading!

## Technologies

Commander 2x2 is meant to be a hub for our community, sharing rules, events, and decklists that achieved noticeable results. With that in mind, we chose a simple stack for static site maintenance with Astro, Tailwind CSS, and DaisyUI. The idea is to keep the project simple and easy to maintain, adding more features as the community grows and resources become available.

### Setup

To run the project locally, use the Node.js version pinned in `.nvmrc` (22) and pnpm via corepack, then run the following commands:

```bash
corepack enable
pnpm install
pnpm dev
```

### Documentation

- [AGENTS.md](AGENTS.md): entry point for coding agents (and humans): commands, layout and conventions
- [CONTEXT.md](CONTEXT.md): domain glossary (format rules, decks, banlist, ranking)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): stack, data flow, build and deploy
- [docs/data-updates.md](docs/data-updates.md): how to update the ranking, decks, events and banlist
- [CONTRIBUTING.md](CONTRIBUTING.md): setup, branches, commits and pull requests

## Contributors

Thanks to everyone who contributes to keep Commander 2x2 up and running! ✨

<!-- ALL-CONTRIBUTORS-LIST:START -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/guilhermeocosta">
          <img src="https://github.com/guilhermeocosta.png?size=100" width="100px;" alt="Guilherme de Oliveira Costa"/><br />
          <sub><b>Guilherme de Oliveira Costa</b></sub>
        </a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/FelipeAmalfi">
          <img src="https://github.com/FelipeAmalfi.png?size=100" width="100px;" alt="Felipe Amalfi"/><br />
          <sub><b>Felipe Amalfi</b></sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

### How to Contribute

You can help us with one of our issue listed on [GitHub](https://github.com/guilhermeocosta/commander-2x2/issues).

1. Fork the repository
2. Create a branch for your change (`git checkout -b feat/new-feature`)
3. Commit your changes using Conventional Commits (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for the details.

For other ways to contribute, send an email to [admin@commander2x2.org](mailto:admin@commander2x2.org).

## License

Copyright 2025 Commander 2x2 - All rights reserved
