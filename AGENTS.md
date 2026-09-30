# Instrucoes para agentes

## Contexto do projeto

- Este repositorio e um site estatico em Jekyll, com templates Liquid e conteudo principalmente em portugues.
- Leia `_config.yml`, os layouts e os includes envolvidos antes de alterar uma pagina.
- Posts publicados ficam em `_posts/` e usam front matter Jekyll. Preserve datas, permalinks e metadados existentes.
- `_site/` e a saida gerada pelo Jekyll. Altere as fontes e gere o site; nao edite a saida manualmente.
- `assets/` contem arquivos servidos pelo site. `src/js/` e `src/styl/` guardam fontes; verifique e mantenha os bundles correspondentes em `assets/` sincronizados.
- `gulpfile.js` e um pipeline legado. Os scripts npm atuais nao executam Gulp; confirme como um bundle e gerado antes de modifica-lo.

## Desenvolvimento e verificacao

- Use a versao Ruby indicada em `.ruby-version` e as gems do `Gemfile.lock`.
- Instale dependencias Ruby com `bundle install` e Node com `npm ci`.
- Para desenvolvimento, use `npm run dev`.
- Para gerar o site e rodar os smoke tests, use `npm run build`.
- Para executar apenas os testes, gere `_site/` primeiro e rode `npm test`.
- Os testes em `test/site.test.js` verificam arquivos gerados, referencias aos bundles, indice de busca, comentarios sob demanda e headers.
- O site e publicado no GitHub Pages via `.github/workflows/ci.yml`: pull requests validam sem publicar; pushes para `master` publicam `_site` apos build, smoke tests e Lighthouse.
- A publicacao manual deve ser iniciada em Actions na branch `master`. A origem do Pages no repositorio precisa estar configurada como GitHub Actions.

## Cuidados nas alteracoes

- Prefira mudancas pequenas que respeitem os layouts, includes e estilos existentes.
- Mantenha scripts de terceiros desativados por padrao; `_config.yml` controla isso com `third_party_scripts`.
- Comentarios Disqus sao carregados apos interacao. Preserve esse comportamento quando alterar comentarios ou scripts externos.
- Ao mexer em conteudo ou templates, confira o HTML gerado e rode os testes pertinentes.
- Nao remova paginas, assets ou includes antigos sem verificar referencias e necessidade de compatibilidade.
- Nao adicione dependencias ou ferramentas de build sem necessidade clara e documente qualquer novo comando de manutencao.
