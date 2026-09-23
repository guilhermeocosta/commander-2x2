# Commander 2x2

[![English](https://img.shields.io/badge/lang-en-blue)](README.en.md)

Boas vindas ao Commander 2x2, um formato competitivo de Commander em duplas. Para saber mais sobre o formato, suas regras e como participar, visite o site oficial do formato em [commander2x2.org](https://commander2x2.org).

Se você está aqui para saber mais sobre os bastidores do projeto, continue lendo!

## Tecnologias

O objetivo do Commander 2x2 é ser um hub para a nossa comunidade, divulgando regras, eventos e listas de decks que tiveram resultados. Para isso, escolhemos uma stack simples para a manutenção de sites estáticos com Astro, Tailwind CSS e DaisyUI. A ideia é que o projeto evolua gradativamente e seja possível adicionar mais funcionalidades à medida que a comunidade crescer e angariarmos recursos.

### Setup

Para rodar o projeto localmente, use a versão do Node.js definida em `.nvmrc` (22) e o pnpm via corepack, e rode os seguintes comandos:

```bash
corepack enable
pnpm install
pnpm dev
```

### Documentação

A documentação técnica está em inglês:

- [AGENTS.md](AGENTS.md): ponto de entrada para agentes de código (e humanos): comandos, estrutura e convenções
- [CONTEXT.md](CONTEXT.md): glossário do domínio (regras do formato, decks, banlist, ranking)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): stack, fluxo de dados, build e deploy
- [docs/data-updates.md](docs/data-updates.md): como atualizar ranking, decks, eventos e banlist
- [CONTRIBUTING.md](CONTRIBUTING.md): setup, branches, commits e pull requests

## Contribuidores

Agradecemos a todos que contribuem para manter o Commander 2x2 funcionando! ✨

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

### Como Contribuir

Você pode nos ajudar com uma de nossas listas de issues no [GitHub](https://github.com/guilhermeocosta/commander-2x2/issues).

1. Faça um fork do repositório
2. Crie uma branch para sua mudança (`git checkout -b feat/nova-feature`)
3. Commit suas mudanças seguindo o Conventional Commits (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feat/nova-feature`)
5. Abra um Pull Request

Veja o [CONTRIBUTING.md](CONTRIBUTING.md) para os detalhes.

Para outras formas de contribuir, mande um e-mail para [admin@commander2x2.org](mailto:admin@commander2x2.org).

## Licença

Copyright 2025 Commander 2x2 - Todos os direitos reservados
