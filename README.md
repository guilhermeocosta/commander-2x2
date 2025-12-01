# Commander 2x2 Website

Formato competitivo de Commander em duplas. Site estático construído com Astro, Tailwind CSS e DaisyUI.

## Tecnologias

- **Framework**: Astro 5.15.3 (Static Site Generation)
- **Styling**: Tailwind CSS + DaisyUI
- **Type Safety**: TypeScript
- **Content**: MDX para changelog, JSON para dados estruturados
- **Deployment**: Vercel (otimizado para estático)
- **Analytics**: PostHog (produção apenas)
- **SEO**: Meta tags, Open Graph, Twitter Cards, Sitemap, Robots.txt

## Responsividade

- **Mobile-first**: Design otimizado para dispositivos móveis
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Menu hambúrguer para mobile, horizontal para desktop
- **Cards**: Grid responsivo (1 coluna mobile, 2 colunas tablet, 3 colunas desktop)

## Desenvolvimento

### Pré-requisitos
- Node.js 18+
- pnpm

### Setup
```bash
# Instalar dependências
pnpm install

# Rodar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview

# Lint e type checking
pnpm run lint
pnpm run build
```

## Deploy

### Vercel (Recomendado)
```bash
# Deploy para produção
pnpm run deploy

# Ou manualmente:
pnpm run build
vercel --prod
```

### Configuração de Ambiente
- **PostHog**: Configure `phc_YOUR_API_KEY_HERE` em `src/components/PostHog.astro`
- **URL**: Atualize URLs em `src/utils/seo.ts` para o domínio de produção

## QA Checklist

- [x] Build sem erros
- [x] Lint passando
- [x] TypeScript check OK
- [x] Mobile layout otimizado
- [x] Links funcionando
- [x] Images carregando
- [x] SEO meta tags OK
- [x] Sitemap acessível
- [x] Robots.txt OK
- [x] Analytics configurado
- [ ] Performance > 90 Lighthouse
- [ ] Accessibility 100 Lighthouse

## Licença

Copyright 2025 Commander 2x2 - Todos os direitos reservados
