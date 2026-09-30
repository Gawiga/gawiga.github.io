# gawiga.github.io

Site pessoal e blog estático em Jekyll, com templates Liquid, estilos Stylus e JavaScript para busca e navegação. O site é gerado como arquivos estáticos e não depende de um backend de aplicação.

## Stack e comandos

- Ruby `4.0.7` (em `.ruby-version`), Jekyll `4.4.1` (em `Gemfile`) e Node.js `22` na CI.
- Os scripts npm compilam os assets, executam Jekyll e rodam os smoke tests.
- Plugins Jekyll: `jekyll-feed`, `jekyll-seo-tag` e `jekyll-sitemap`.

Instale as dependências e rode localmente:

```bash
bundle install
npm ci
npm run dev
```

O servidor local fica em `http://localhost:4000`. Para gerar o site e testar:

```bash
npm run build
```

Comandos npm disponiveis: `dev`, `serve`, `build`, `build:site`, `test`, `test:e2e` e `audit`.

## FEATURES

- Tema escuro como padrão e botão no canto superior direito para alternar entre os temas escuro e claro. A escolha fica salva neste navegador.
- Os dois temas estão disponíveis em todas as páginas geradas:
- `/` (início)
- `/blog/` (índice do blog)
- `/blog/agregadores-ou-plataformas.html`
- `/blog/arquitetura-explicita.html`
- `/blog/blockchain-ou-governanca-descentralizada.html`
- `/blog/clt_ou_pj.html`
- `/blog/coinhive/`
- `/blog/computacao-distribuida-blockchain-e-o-poder-na-mao-do-usuario.html`
- `/blog/criando-uma-conexao-com-oracle-client-usando-csharp.html`
- `/blog/drex.html`
- `/blog/howto.html`
- `/blog/inteligencia-artificial.html`
- `/blog/investimentos.html`
- `/blog/javascript.html`
- `/blog/orquestrando-agentes.html`
- `/blog/politica-e-filosofia.html`
- `/blog/serverless.html`
- `/blog/sobre-html-e-css.html`
- `/blog/sobre-ruas-e-afins/`
- `/blog/solidity.html`
- `/blog/status-blockchain-2023.html`
- `/blog/teoria-da-categoria.html`
- `/blog/welcome.html`
- `/series/` (séries)
- `/tags/` (tags)
- `/en.html` (página em inglês)
- `/old.html` (arquivo legado)
- `/404.html` e `/404old.html` (páginas de erro)

## Hospedagem e publicação

Este site está hospedado no GitHub Pages, com domínio personalizado `gawiga.com`. A publicação é feita pelo GitHub Actions, que compila o site e envia o diretório `_site` como artefato do Pages; não é usado o build nativo do GitHub Pages.

- Pull requests executam build, smoke tests e Lighthouse, sem publicar.
- Pushes para `master` executam as mesmas verificações e publicam automaticamente quando todas passam.
- O workflow também pode ser iniciado manualmente em **Actions > CI > Run workflow**. Para publicar, selecione a branch `master`.
- Nas configurações do repositório, selecione **Settings > Pages > Build and deployment > GitHub Actions** como origem.

Antes de enviar alterações, rode `npm run build`. Esse comando compila os assets e o site, depois executa os smoke tests. O workflow da CI também roda as auditorias Lighthouse antes do deploy.

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
- A CI e o deploy do GitHub Pages estão em `.github/workflows/ci.yml`; CodeQL analisa JavaScript e Ruby.
- `src/js/` e `src/styl/` contêm fontes; `assets/` contém arquivos servidos pelo site. O `gulpfile.js` descreve um fluxo legado e não é chamado pelos scripts npm atuais. Confira como gerar os bundles antes de alterar as fontes e mantenha fontes e arquivos servidos sincronizados.
- Não edite `_site/` manualmente: ele é recriado pelo Jekyll.
- `bundle exec jekyll serve` tambem inicia o servidor Jekyll diretamente.

## Segurança e recursos externos

O arquivo `_headers` define headers de segurança para hosts estáticos compatíveis. No GitHub Pages, a aplicação desses headers depende de um proxy ou edge que os suporte. Analytics e anúncios só são incluídos em produção quando `third_party_scripts` está habilitado.

## Licença

Distribuído sob a licença MIT; os créditos do template base original devem ser preservados.
