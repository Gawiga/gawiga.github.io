## Blog pessoal do Gawiga

Baseado nesta [Demo](http://willianjusten.com.br/will-jekyll-template) do Willian Justen.

Tecnologias presentes no tema:
- Gulp
- Stylus (Jeet, Rupture, Kouto Swiss)
- Smoothscroll
- Live Search
- Offcanvas Menu
- SVG icons
- Very very small and fast!
- Shell Script to create posts
- Tags page
- Series page
- About Me page
- Feed RSS
- Sitemap.xml
- Color Customization
- Info Customization

## Configuração Básica
1. [Instale o Jekyll](http://jekyllrb.com)
2. Faça o fork do projeto [Will Jekyll Template](https://github.com/willianjusten/will-jekyll-template/fork)
3. Clone o repositório que você acabou de fazer o fork.
4. Edite `_config.yml` para personalizar seu site.
5. Veja exemplos de post em `_posts` para ver exemplos para atribuir categorias e tags, e outros dados de YAML.
6. Leia a documentação abaixo para mais costumização de ponteiros e documentação.

## Site e Configuração do Usuário
Você deve preencher algumas informações do `_config.yml` para constomizar seu site.

```
# Site settings
description: A blog about lorem ipsum dolor sit amet
baseurl: "" # the subpath of your site, e.g. /blog/
url: "http://localhost:3000" # the base hostname & protocol for your site 

# User settings
username: Lorem Ipsum
user_description: Anon Developer at Lorem Ipsum Dolor
user_title: Anon Developer
email: anon@anon.com
twitter_username: lorem_ipsum
github_username:  lorem_ipsum
gplus_username:  lorem_ipsum
disqus_username: lorem_ipsum
```

**Don't forget to change your baseurl before build your site!**

## Costumização de Cores

Todas as variáveis de cor estão em `src/styl/variable`. Para alterar a cor principal, apenas sete o novo valor em `main`. Outras cores são para textos e background de código.

## Criando Posts

Você pode usar o `initpost.sh` para criar seus novos posts. Apenas siga o comando:

```
./initpost.sh -c Post Title
```

The new file will be created at `_posts` with this format `date-title.md`.

## Front-matter 

When you create a new post, you need to fill the post information in the front-matter, follow this example:

```
---
layout: post
title: "How to use"
date: 2015-08-03 03:32:44
image: '/assets/img/post-image.png'
description: 'First steps to use this template'
tags:
- jekyll 
- template 
categories:
- I love Jekyll
twitter_text: 'How to install and use this template'
---
```

## Rodando o blog na sua máquina local

In order to compile the assets and run Jekyll on local you need to follow those steps:

- Install [NodeJS](https://nodejs.org/)
- Run `npm install` 
- Run `gulp`

## Dúvidas & Doações

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@willian_justen](https://twitter.com/willian_justen) or file a [GitHub Issue](https://github.com/willianjusten/will-jekyll-template/issues/new).

If you liked my work, buy me a coffee <3
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UTMFZUHX6EUGE)

## Licença

This theme is free and open source software, distributed under the The MIT License. So feel free to use this Jekyll theme on your site without linking back to me or using a disclaimer. If you’d like to give me credit somewhere on your blog or tweet a shout out to [@willian_justen](https://twitter.com/willian_justen), that would be pretty sweet.
