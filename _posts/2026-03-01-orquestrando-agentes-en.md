---
layout: post
title: "Orchestrating Agents"
date: 2026-03-01
image: '/assets/img/'
permalink: /en/blog/orchestrating-agents
description: How to build your web app for free today
lang: en
translation_key: /blog/orquestrando-agentes
translation_url: /blog/orquestrando-agentes
---

Since everyone is talking about AI, I thought I would share a personal story and talk a little about the present.

> My wife does not like spreadsheets.

I do. I think they give users a lot of power and have that WYSIWYG interface.[1](https://www.youtube.com/watch?v=H-zQky0HGhg)

I have argued more than once that entire systems could simply be spreadsheets, and nothing more.

My wife is a psychologist, and she needed a simple way to manage patient sessions: an easy, practical system that could do the accounting and generate reports for each month of work.

With all the buzz around agents, I wondered: *"How hard could it be to orchestrate an agent to build a small system?"* 🤔 It had to be a system made for her, her way, and mobile-first.

I grabbed my home server, an old laptop running Ubuntu Server 24.04, and somehow got PocketBase running. Yes, as a .NET person, I went with a solution written in Go, and I have no regrets so far. My back end was ready: authentication, SQLite tables, the whole thing.

In two days, I had burned through all my free tokens. 😅

**What surprised me**

In very little time, I had a working system with end-to-end CRUD and the authentication it needed.

**What took work**

**Integration.** All my prior knowledge made a difference. Editing `nginx.conf` on Ubuntu, creating a systemd service for PocketBase, having already configured a Tailscale Funnel... without all that, my home server would not even be up.

**Guiding the agent.** AI gets lost. Its context is limited. It is like a computer genius with amnesia. If I had refined my prompts more, specified the front-end components and the architecture I wanted, I think the code would have been much cleaner and better organized. Adding skills helped a lot. People are also saying that guiding prompts with TDD helps; I still need to try that.

In the end, agents let me build a MicroSaaS (if I can even call a few weeks of experimenting that) extremely quickly, in about the time I would have spent putting together a spreadsheet, but with a much better final product.

Still, they did not solve the main problem: **making decisions**.

Yes, some parts of the code were a little strange, but I wrote the prompt and made the final commit at the end of the day. I am the one who has to explain to my wife why a button does not work (and that has already happened), not the AI. 😅

Try the app and send me feedback:
[https://sazen.netlify.app/](https://sazen.netlify.app/)

**TL;DR**: The stack I used to build web apps at no cost (suggestions welcome).

🏠 Infrastructure: Home server, an old laptop with Ubuntu Server 24.04, and Tailscale Funnel.

⚙️ Back end: PocketBase with embedded SQLite, enabled through systemd and nginx.

🎨 Front end: Astro (AstroWind template) with SSR, Tailwind, Prettier, and Netlify Functions, hosted on Netlify.

🤖 AI: Codex, Claude Haiku, Qwen (all on free plans for now).