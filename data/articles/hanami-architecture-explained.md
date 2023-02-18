---
id: 2
author: "swilgosz"
topics: ["hanami"]
title: "Hanami architecture explained"
excerpt: "People ask me about the simple explanation of Hanami architecture. Why is it so complicated? Is it? I'll try to explain it in simple words."
published: true
publishedAt: "2021-06-29"
modifiedAt: "2022-07-19"
aliases: ['HMAP002']
thumbnail:
  full: /images/articles/hanami-architecture-explained/cover-full.jpeg
  big: /images/articles/hanami-architecture-explained/cover-big.jpeg
  small: /images/articles/hanami-architecture-explained/cover-small.jpeg
discussions:
  twitter: null
  reddit: []
source: null
category: stray
---

People start to ask me a lot about **Hanami architecture** and why it's so complicated, what was the point and [how it differs from rails](/episodes/8-rails-vs-hanami-mapping-frameworks).

In this episode, I'll explain this concept with simple words. However,  to keep things simple, I'll extract more detailed stuff into **separate articles**.

### The architecture.

First of all, let's clarify the term *software architecture*. **Martin Fowler** already wrote [a dozen of posts about it](https://martinfowler.com/architecture/), but in general, the architecture isn't really about **MVC**, **Service objects**, used **ORM** or things like that. **MVC is not architecture** - let's start with that, so we'll be able to more easily go into the core of the question.

> Note: If you're looking for a detailed explanation of how repositories, relationships, and models map to Rails Models, or why View in Hanami is a ruby object, then **subscribe to the Newsletter ** as you need to wait for the next episodes.

I'm pointing at this, because people asking me about *Hanami architecture*, **do not ask about what they want to get an answer for**. They ask me specifically about "*how Hanami's building blocks differ from Rails MVC*" and why there are so many of them.

> This question **I already addressed in an [episode #8](https://hanamimastery.com/episodes/9-guide-to-models-in-hanami-and-rom)**. If this is what bothers you, feel free to check it out!

But, as most of the people use words: "hanami architecture", **let's explain that first.**

#### Some examples of software architecture:

- Monolith
- Microservice Architecture
- Serverless Architecture
- Micro Frontends

The **application architecture** term refers to a much higher level than the fact if we **extract validations from models or not**.

### Monolith-First approach.

Hanami is a framework, **that supports all kinds of architectures**, and this is what differs from Rails, however, at the very root it evangelizes the [Monolith-First](https://martinfowler.com/bliki/MonolithFirst.html) - to [quickly build a complete application from scratch](/episodes/1-creating-hanami-application).

This is **exactly what rails** does.

What differs from Rails, is that Hanami enforces the **separation of concerns**, encouraging developers by default to build applications that scale well, and are **easily transferrable into other architecture types**.

### How Hanami supports multiple architectures?

There are several core concepts Hanami introduces, which allow developers to write much **bigger applications without slowing down over time**. The first of them is **Slices**.

#### 1. Slices

A **slice** in Hanami is a way for you **to add boundaries to certain parts of your application.** You can think of it as a similar concept to `Rails::Engine`, but it's much more self-contained and independent of the other parts of the system.

Slices are mini-applications, completely independent, but available in the same codebase for simplicity. If you'll ever want to extract this part to a completely separate project, you'll be able more or less just copy the folder out and paste it to the other service repository, while most of the things will be still working out of the box.

#### 2. Separation of concerns

The second big part of the Hanami is the *separation of concerns* - a high-level concept that the whole framework is built upon.

Hanami [consists of multiple gems](https://github.com/hanami) and gem families, that build separate components of the framework, but it does not have hard dependencies, meaning, you can replace any of them if you wish with your own version or even a completely custom solution.

This means, you can introduce some of Hanami components in your Rails projects if you wish! The philosophy is similar to what DRY-RB libraries do. **Handle the given task, and don't care about the others.**

### Application framework

Every single component of Hanami is written following the core concepts. No global state mutation, no hard dependencies, dependency injection over global access, and so on.

For example, Hanami Uses ROM (with `sequel` under the hood) as a persistence layer, but this is also replaceable, You can use multiple databases out of the box, or you can just **don't include persistence at all** if you don't need any persistence logic.

You can easily skip views, mailers, or whatever else, by removing them from the `Gemfile`. And this is what makes Hanami not only Web Framework but also **Application framework**.

By using Hanami you can write crawlers, cron jobs, background workers, applications that just talk with multiple systems without saving anything... and complete web applications too!

This is the real power of this framework and this is what differs it from rails on the concept and architecture level.

### Summary

I hope you've enjoyed this article, and if you want to see more content in this fashion, **[Subscribe to HM YT channel](https://www.youtube.com/c/HanamiMastery)** and **[follow me on Twitter](https://twitter.com/hanamimastery)**!

### Special Thanks!

I'd like to thank all people supporting this project! Any support allows me to spend more time on creating this content, **promoting great open source projects**.
