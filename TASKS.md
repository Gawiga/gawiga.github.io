# Melhorias de performance

Lista priorizada para medir, implementar e validar melhorias no site. Registre os resultados antes/depois das mudancas, usando as mesmas paginas e condicoes de teste.

## P0: estabelecer uma referencia

- [ ] Medir Lighthouse em mobile e desktop para a home, o indice do blog e um post; anotar LCP, INP, CLS, tamanho transferido e requests.
- [ ] Inspecionar o waterfall e confirmar o que e carregado em cada layout. Separar os recursos globais dos usados somente em paginas legadas.

## P1: reduzir bytes de imagens

- [ ] Converter imagens grandes para WebP ou AVIF com fallback quando necessario. Referencias atuais incluem `assets/img/sobre-ruas.png` (~598 KB), `assets/img/blog-image.png` (~284 KB) e `assets/img/drex.jpg` (~109 KB).
- [ ] Gerar variantes responsivas (`srcset`/`sizes`) e dimensoes apropriadas para os tamanhos reais de exibicao.
- [ ] Aplicar `loading="lazy"` e `decoding="async"` em imagens fora da primeira tela; manter a imagem principal da pagina carregamento imediato e avaliar prioridade explicita apenas se for o LCP.
- [ ] Revisar o favicon ICO (~99 KB) e reduzir seu peso mantendo os tamanhos necessarios.

## P1: remover recursos sem uso

- [ ] Auditar referencias por layout antes de remover bibliotecas antigas: `assets/js/jquery-3.2.1.js` (~268 KB), arquivos Bootstrap nao minificados e source map. O include Bootstrap existe, mas nao e usado pelos layouts mais comuns.
- [ ] Confirmar se o layout Bootstrap e paginas arquivadas ainda precisam desses recursos; remover apenas os arquivos comprovadamente sem consumidores.
- [ ] Verificar os arquivos CSS/JS duplicados e exemplos (`aula*.js`) para decidir se devem continuar publicados.

## P2: otimizar entrega de CSS e JavaScript

- [ ] Medir o tamanho comprimido e o custo de execucao de `assets/css/main.css` e `assets/js/main.js`; otimizar apenas onde o perfil indicar impacto.
- [ ] Avaliar separar funcionalidades usadas em poucas paginas, como busca, para evitar codigo desnecessario nas demais rotas.
- [ ] Confirmar compressao Brotli/Gzip e cache de assets com hash ou versao de conteudo no host de producao.
- [ ] Documentar um pipeline reproduzivel para compilar `src/styl/` e `src/js/` para os arquivos servidos, substituindo ou formalizando o fluxo Gulp legado.

## P2: limitar custo de terceiros e regressao

- [ ] Manter analytics, anuncios e comentarios fora do caminho critico; medir o impacto quando `third_party_scripts` estiver ativo em producao.
- [ ] Adicionar Lighthouse CI ou outro teste automatizado com limites de performance definidos depois da linha de base.
- [ ] Repetir as medidas apos cada grupo de mudancas e validar visualmente as imagens em mobile e desktop.
