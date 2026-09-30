---
layout: post
title: "Explicit Architecture: DDD, Hexagonal, Onion, Clean, and CQRS"
date: 2021-03-27
image: '/assets/img/'
permalink: /en/blog/explicit-architecture
description: An English overview of the ideas in the Portuguese article
lang: en
translation_key: /blog/arquitetura-explicita
translation_url: /blog/arquitetura-explicita
---

> This English edition is an original summary, not a full translation. The Portuguese article translates a post by [Herberto Graca](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/). Read the [Portuguese version](/blog/arquitetura-explicita) or the [original article](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/).

The article brings together ideas from Domain-Driven Design, Hexagonal Architecture, Onion Architecture, Clean Architecture, and CQRS under the name **Explicit Architecture**. Its goal is to make the boundaries and responsibilities of a system visible in its code.

At the center is the **Application Core**, containing the business logic. User interfaces and delivery mechanisms sit outside it, as do infrastructure tools such as databases, search engines, and third-party APIs. Adapters connect those external tools to the core through ports: interfaces designed around the needs of the application, rather than copies of a vendor's API. This keeps dependencies pointing inward and allows tools to be replaced without making the business logic depend on them.

The article then organizes the core into layers. The application layer coordinates use cases, repositories, commands, queries, and application events. The domain layer contains domain services and the domain model: entities, value objects, and domain events. The domain model remains independent of the application layer.

It also argues for organizing code by domain component, not only by technical layer. Components should have high cohesion and low coupling. When one component needs to react to another, events and a small shared kernel can avoid direct dependencies. When components need each other's data, they can read it without taking ownership; in systems with separate data stores, local copies can be updated from events.

The control-flow examples show how controllers, buses, handlers, application services, queries, repositories, and persistence adapters fit together. Whether a system uses a command/query bus or calls application services directly, dependencies crossing the Application Core boundary should point inward.

The article's conclusion is deliberately pragmatic: these patterns are a map, not the territory. Teams should understand them and then choose the level of separation that fits the system's requirements, delivery timeline, lifetime, and experience of the people building it. The goal is a cohesive, decoupled codebase where change is easier, faster, and safer, not architecture for its own sake.