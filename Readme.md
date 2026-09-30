# gawiga.github.io

Site pessoal e blog estático em Jekyll, com templates Liquid, estilos Stylus e JavaScript para busca e navegação. O site é gerado como arquivos estáticos e não depende de um backend de aplicação.

## Stack e comandos

- Ruby `3.3.5` (em `.ruby-version`) e Jekyll `4.3.4` (em `Gemfile`).
- Node.js `20` na CI; os scripts npm executam Jekyll e os smoke tests.
- Plugins Jekyll: `jekyll-feed`, `jekyll-seo-tag` e `jekyll-sitemap`.

Instale as dependências e rode localmente:

```bash
bundle install
npm ci
npm run dev
```

O servidor local fica em `http://127.0.0.1:4000`. Para gerar o site e testar:

```bash
npm run build
```

Comandos npm disponiveis: `dev`, `serve`, `build`, `build:site`, `test`, `test:e2e` e `audit`.

## Estrutura do site

```text
.
|-- _config.yml              configuração Jekyll, metadados e plugins
|-- _posts/                  posts publicados, com front matter
|-- _pages/                  diretório reservado para páginas adicionais
|-- _layouts/                estruturas de página Jekyll
|-- _includes/               componentes Liquid reutilizados nos layouts
|-- assets/                  CSS, JavaScript, imagens, ícones e vídeo servidos
|-- src/                     fontes JavaScript e Stylus
|-- post/                    páginas estáticas legadas
|-- old/                     conteúdo antigo e exemplos arquivados
|-- blog.html                índice do blog
|-- index.html               pagina inicial
|-- series.html, tags.html   paginas de series e tags
|-- search.json              indice usado pela busca
|-- feed.xml, sitemap.xml    feed RSS e mapa do site
|-- test/                    smoke tests do site gerado
|-- .github/workflows/       CI e analise CodeQL
|-- _site/                   saida gerada pelo Jekyll
`-- gulpfile.js              pipeline Gulp legado
```

O `_config.yml` define o permalink dos posts, a navegação, os plugins e `third_party_scripts: false`. A home e as páginas de post usam layouts/includes dedicados; comentários Disqus só carregam depois da interação do visitante.

## Build e manutencao

- `npm run build` executa `bundle exec jekyll build` e depois `npm test`.
- `npm run build:site` gera apenas o site; `npm test` verifica a saída existente em `_site/`.
- A CI em `.github/workflows/ci.yml` instala as dependências, gera o site e roda os smoke tests. CodeQL analisa JavaScript e Ruby.
- `src/js/` e `src/styl/` contêm fontes; `assets/` contém arquivos servidos pelo site. O `gulpfile.js` descreve um fluxo legado e não é chamado pelos scripts npm atuais. Confira como gerar os bundles antes de alterar as fontes e mantenha fontes e arquivos servidos sincronizados.
- Não edite `_site/` manualmente: ele é recriado pelo Jekyll.
- `bundle exec jekyll serve` tambem inicia o servidor Jekyll diretamente.

## Segurança e recursos externos

O arquivo `_headers` define headers de segurança para hosts estáticos compatíveis. No GitHub Pages, a aplicação desses headers depende de um proxy ou edge que os suporte. Analytics e anúncios só são incluídos em produção quando `third_party_scripts` está habilitado.

## Licença

Distribuído sob a licença MIT; os créditos do template base original devem ser preservados.
