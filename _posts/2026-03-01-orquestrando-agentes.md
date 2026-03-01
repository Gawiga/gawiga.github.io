---
layout: post
title: "Orquestrando Agentes"
date: 2026-03-01
image: '/assets/img/'
permalink: /blog/orquestrando-agentes
description: Como criar seu webapp de graça hoje
---
Já que está todo mundo falando de IA, venho aqui contar um causo pessoal e falar um pouco do presente.

| Minha esposa não gosta de planilhas. 

Eu gosto. Acho que elas dão bastante poder para o usuário e têm aquela interface WYSIWYG.[1](https://www.youtube.com/watch?v=H-zQky0HGhg) 

Já argumentei várias vezes que existem sistemas inteiros que poderiam simplesmente ser uma planilha — e não mais do que isso.

E ela, que é psicóloga, precisava de uma forma simples de gerenciar as sessões com os pacientes e assim, ter de maneira fácil e prática, um sistema que faça a contabilidade e gere relatórios do mês trabalhado.

Com todo o boom dos agentes, pensei: 
*"Quão difícil deve ser orquestrar um agente para fazer um pequeno sistema?"*. 🤔
Mas teria que ser um sistema feito para ela, do jeito dela e mobile first.

Peguei meu home server, um notebook velho com ubuntu server 24.04 e rodei de forma mágica o pocketbase. Sim, eu como dotneteiro fui de uma solução em Go, e até agora não me arrependo de nada. Pronto, já tinha todo meu backend configurado, autenticação, tabelas em sqlite e vamo que vamo.

Em dois dias, eu já tinha esgotado meus tokens gratuitos. 😅

**O que me surpreendeu**

Em pouquíssimo tempo eu tinha um sistema funcional, fazendo todo o CRUD de ponta a ponta e autenticação necessários.

**O que deu trabalho**

**Integração**. Todo o conhecimento prévio que eu já tinha fez diferença. 
Mexer no nginx.conf no Ubuntu, criar o systemd para o pocketbase, já ter configurado o funnel com Tailscale… sem isso, meu home server nem estaria de pé.

**Direcionar o agente**. A IA se perde. O contexto é limitado. É como um gênio da computação com amnésia. Se eu tivesse refinado melhor os prompts, especificado os componentes do front e a arquitetura desejada, acredito que o código estaria muito mais limpo e organizado. Depois que adicionei skills melhorou bastante. Também estão dizendo que orientar os prompts com TDD ajuda — ainda preciso testar.

No final das contas, os agentes me permitiram criar um MicroSaaS *(se é que eu posso chamar esse experimento de algumas semanas disso)* de forma extremamente acelerada — em um tempo parecido com o que eu gastaria montando uma planilha, mas com um produto final muito melhor.

Porém, eles não resolveram o principal problema: **a tomada de decisão**.

Sim, o código ficou meio estranho em alguns pontos, mas eu que escrevi o prompt e deu o commit no final do dia. Quem vai ter que explicar para minha esposa por que o botão não funciona (e isso já aconteceu) sou eu — não a IA. 😅

Se quiserem testar o app e me dar feedbacks:
[https://sazen.netlify.app/](https://sazen.netlify.app/)

**TLDR**; 
Stack usada para criar webapps sem custo (sugestões são bem vindas).

🏠 Infra: Home server, notebook antigo com Ubuntu Server 24.04 e Tailscale funnel.

⚙️ Backend: PocketBase com SQLite embutido habilitado via systemd e nginx.

🎨 Front: Astro (template AstroWind) como SSR, com tailwind, prettier e netlify functions, hospedado no netlify.

🤖 IA: Codex, Claude Haiku, Qwen (tudo no plano free por enquanto).