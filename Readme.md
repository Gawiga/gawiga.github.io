# gawiga.github.io

Site pessoal e blog estático em Jekyll, com templates Liquid, estilos em Stylus e um pequeno bundle JavaScript para busca, overlay de pesquisa e navegação lateral.

## Visão geral

O projeto prioriza simplicidade de deploy e baixo acoplamento:

- geração estática com Jekyll;
- conteúdo em `_posts/`;
- layouts e includes em `_layouts/` e `_includes/`;
- estilos fonte em `src/styl/` e bundle final em `assets/css/`;
- scripts fonte em `src/js/` e bundle final em `assets/js/main.js`.

O site roda localmente sem depender de backend de aplicação. Recursos de terceiros como analytics, anúncios e comentários ficam desativados por padrão no ambiente local.

## Stack

- Ruby `3.3.x`
- Bundler `2.5.x`
- Jekyll `4.3.4`
- Node.js `20.x`
- npm `11.x`
- Stylus + Jeet + Rupture + Kouto Swiss

## Estrutura principal

- `_posts/`: posts do blog
- `_includes/`: componentes reutilizáveis
- `_layouts/`: layouts Jekyll
- `src/js/`: fontes JavaScript
- `src/styl/`: fontes Stylus
- `assets/`: artefatos servidos pelo site
- `test/`: smoke tests do build
- `.github/workflows/`: CI e análise estática

## Como rodar localmente

Instale as dependências:

```bash
bundle install --local
npm install
```

Gere o site:

```bash
npm run build
```

Suba o servidor local:

```bash
npm run dev
```

Servidor esperado:

```text
http://127.0.0.1:4000
```

## Comandos úteis

```bash
npm run build
npm run build:site
npm run dev
npm run test
npm run test:e2e
npm run audit
```

## Testes

Hoje o projeto tem smoke tests focados em geração estática:

- existência dos arquivos principais em `_site/`;
- referência correta ao bundle CSS/JS;
- integridade básica de `search.json`;
- presença do gatilho lazy de comentários;
- presença do arquivo `_headers` para hosts compatíveis.

Executar:

```bash
npm test
```

## Observações de manutenção

- O bundle JavaScript final `assets/js/main.js` ainda é derivado dos arquivos em `src/js/`.
- O pipeline legado de Gulp continua no repositório, mas o fluxo principal do projeto já pode operar com Jekyll + npm scripts.
- O `jekyll-admin` foi removido para simplificar o ambiente local e reduzir atrito com dependências Ruby.
- O bump do `jekyll` para `4.4.1` segue desejável, mas ainda depende de correção do ambiente Ruby/OpenSSL local para atualização remota das gems.

## Segurança e headers

O repositório inclui um arquivo `_headers` com uma baseline de segurança para hosts estáticos compatíveis, incluindo:

- `Content-Security-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Permissions-Policy`

Em GitHub Pages puro, esses headers ainda dependem de um edge/proxy compatível.

## Comentários e scripts de terceiros

Por padrão, `_config.yml` mantém:

```yml
third_party_scripts: false
```

Isso evita carregar analytics, AdSense e scripts externos durante desenvolvimento local. Comentários Disqus são carregados sob demanda por interação do usuário.

## Dependabot e CI

O projeto está preparado para:

- updates semanais de `bundler`, `npm` e `github-actions`;
- workflow de CI com build Jekyll e smoke tests;
- workflow de CodeQL atualizado para as actions mais recentes.

## Licença

Distribuído sob a licença MIT, preservando os créditos do template base original quando aplicável.
