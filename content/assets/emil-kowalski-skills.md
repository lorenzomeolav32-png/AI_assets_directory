---
slug: emil-kowalski-skills
type: claude-skill
title: Emil Kowalski Skills
fileName: emil-kowalski-skills.skill
summary: >-
  Fourteen UI skills from Emil Kowalski that catch the small mistakes agents make
  with animation and interface polish, like ease-in on enter animations, and
  that report what is wrong before they change any code.
category: web-design
tags: [animation, ui, design-engineering, motion, react-native, mobile]
tools: [claude-code]
license: MIT
author: Emil Kowalski
source: https://github.com/emilkowalski/skills
stars: 42800
verified: true
install: |
  npx skills@latest add emilkowalski/skills
installLang: bash
---

## Overview

**Emil Kowalski Skills** is a collection of 14 skills for designers and engineers
who build interfaces with an AI agent. The author says they come from his years
at companies like Vercel and Linear. His argument is that agents lack taste: they
pick `ease-in` for an enter animation when `ease-out` is the right call, or use a
solid border where a semi-transparent shadow would look better. Each skill lists
those mistakes and explains the fix.

The main skill, `emil-design-eng`, is mostly about animation with some general
design advice. The others each handle one job, such as building an animation,
auditing existing ones, or stress-testing a component with awkward data.

## How it works

Each skill is a `SKILL.md` file in the `skills/` folder. You invoke the one that
matches the job, and the agent follows its rules. The repo lists these:

| Skill | What it does |
| --- | --- |
| `emil-design-eng` | The main skill: animation decisions, component details and general design advice. |
| `animate` | Builds an animation from scratch and picks the curve, duration and properties. |
| `animate-expo` | The same standard for React Native and Expo: gestures, sheets, haptics and screen transitions. |
| `review-animations` | Reviews your animations strictly against the author's rules. |
| `improve-animations` | Audits every animation in a codebase and returns prioritized plans any agent can execute. |
| `find-animation-opportunities` | Finds places that would benefit from motion and says what not to animate. |
| `animation-vocabulary` | Teaches you the right words to describe the motion you want. |
| `apple-design` | Apple's interface and motion principles from WWDC talks, translated for the web. |
| `write-swift` | Modern Swift: value types, Swift 6 concurrency, generics, performance and Swift Testing. |
| `pick-ui-library` | Chooses a library the author trusts instead of hand-rolling a toast or installing an abandoned package. |
| `prototype` | Builds several versions of a UI piece and lets you compare them with a switcher. |
| `mobile-native` | Fixes what makes a web app feel like a website on a phone: sticky hover states, the 100vh bug, inputs that zoom the page and safe areas. |
| `break-ui` | Feeds a component worst-case data such as long names, empty lists and huge counts, then reports what breaks. |
| `ask-sonner` | A guide to Sonner, the author's toast library: setup, styling and common fixes. |

## Examples

`emil-design-eng` reviews UI code in a Before/After table with a reason for each
row:

```txt
| Before                   | After                                | Why                                      |
| ------------------------ | ------------------------------------ | ---------------------------------------- |
| transition: all 300ms    | transition: transform 200ms ease-out | Specify exact properties, avoid all      |
| transform: scale(0)      | transform: scale(0.95) + opacity: 0  | Nothing in the real world appears from nothing |
| ease-in on a dropdown    | ease-out with a custom curve         | ease-in feels sluggish                   |
```

It also keeps UI animations under 300ms and recommends custom curves such as
`cubic-bezier(0.23, 1, 0.32, 1)` over the built-in CSS easings. `break-ui` works
differently: it adds a "Demo data / Worst case" toggle to your component, then
reports each break with a severity and a fix. It leaves the fixes until you ask
for them.

## Notes

- Several skills reflect one person's opinions about motion and taste, so expect
  a strong point of view.
- `ask-sonner` covers the author's own toast library, and the README links to his
  newsletter.
- Invoked with no question, `emil-design-eng` and `break-ui` reply with a short
  fixed greeting and wait for your request.

## Licensing note

Released under the MIT License, copyright 2026 Emil Kowalski.

## Installation

You need Node.js to run the installer and an AI coding assistant that supports
skills, such as Claude Code.

1. Open a terminal in your project folder.
2. Run `npx skills@latest add emilkowalski/skills`.
3. Restart your assistant so it picks up the new skills.
4. Invoke `emil-design-eng` with no question. It should answer with a short line
   saying it is ready to help you build interfaces that feel right.
5. Ask for a real task, such as "review the animations in this component", to see
   the Before/After table.
