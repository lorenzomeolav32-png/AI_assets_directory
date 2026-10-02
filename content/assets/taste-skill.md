---
slug: taste-skill
type: claude-skill
title: Taste Skill
fileName: taste-skill.skill
summary: >-
  Thirteen skills that steer coding agents away from boilerplate-looking
  frontends, with three 1-10 dials in the skill file for layout variance, motion
  and visual density. The default skill is still marked experimental.
category: web-design
tags: [frontend, design, anti-slop, animation, gsap, image-generation]
tools: [claude-code, cursor, codex]
license: MIT
author: Leonxlnx
source: https://github.com/Leonxlnx/taste-skill
stars: 91900
verified: true
install: |
  # Install every skill in the repo
  npx skills add https://github.com/Leonxlnx/taste-skill

  # Or install one skill by its install name
  npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
installLang: bash
---

## Overview

**Taste Skill** is a set of portable Agent Skills that aim to upgrade AI-built
interfaces: stronger layout, typography, motion and spacing instead of
boilerplate-looking UIs. The repo describes itself as "the anti-slop frontend
framework for AI agents". It works with Codex, Cursor and Claude Code, and the
README says the rules target design intent rather than one framework, so it applies
to React, Vue or Svelte projects.

The repo holds 10 code skills and 3 image-generation skills. Each does one job, and
you do not need to install all of them.

## How it works

The default skill, `taste-skill` (install name `design-taste-frontend`), is now a
v2 rewrite that the author marks as experimental. It reads your brief, infers a
design language, and follows a design-system map, canonical GSAP code skeletons, a
redesign-audit protocol and a pre-flight check. The v2 rules also ban em dashes.
Three numbers at the top of the file, each from 1 to 10, tune the result:

1. `DESIGN_VARIANCE`: layout experimentation, from centered and clean to
   asymmetric and modern.
2. `MOTION_INTENSITY`: animation depth, from hover effects to scroll and magnetic
   motion.
3. `VISUAL_DENSITY`: information per viewport, from spacious to dense dashboards.

The other skills cover narrower cases:

| Skill | Install name | What it does |
| --- | --- | --- |
| `taste-skill-v1` | `design-taste-frontend-v1` | The original v1, kept for projects that depend on its exact behavior. |
| `gpt-tasteskill` | `gpt-taste` | A stricter variant for GPT and Codex with higher layout variance and stronger GSAP direction. |
| `image-to-code-skill` | `image-to-code` | Generates site references as images, analyzes them, then builds the frontend to match. |
| `redesign-skill` | `redesign-existing-projects` | Audits an existing UI first, then fixes layout, spacing, hierarchy and styling. |
| `soft-skill` | `high-end-visual-design` | Calm, polished UI with softer contrast, whitespace, premium fonts and spring motion. |
| `minimalist-skill` | `minimalist-ui` | Editorial product UI with a restrained palette and crisp structure. |
| `brutalist-skill` | `industrial-brutalist-ui` | A hard, mechanical look with Swiss type, sharp contrast and experimental layout. |
| `output-skill` | `full-output-enforcement` | For models that ship half-finished work: full output, no placeholder comments. |
| `stitch-skill` | `stitch-design-taste` | Rules compatible with Google Stitch, including an optional `DESIGN.md` export. |
| `imagegen-frontend-web` | `imagegen-frontend-web` | Image-only website comps with strong typography and spacing. |
| `imagegen-frontend-mobile` | `imagegen-frontend-mobile` | Image-only mobile screens and flows. |
| `brandkit` | `brandkit` | Image-only brand boards: logo directions, palettes, type and identity applications. |

The three image skills produce reference images and no code. Use them with ChatGPT
Images, Codex image mode or another image generator, then give the frames to your
coding agent.

## Examples

The README suggests picking a skill by situation. Start with `taste-skill` as the
general default, add `soft-skill`, `minimalist-skill` or `brutalist-skill` once you
have chosen a direction, and use `redesign-skill` on an existing codebase. For
`image-to-code-skill`, state the pipeline in your prompt:

```txt
follow the skill: generate images, then analyze, then code
```

## Notes

- The default `taste-skill` is v2 and experimental. If a project depends on the
  earlier behavior, install `taste-skill-v1` with
  `--skill "design-taste-frontend-v1"`.
- The README includes sponsor and referral links for third-party services. They are
  unrelated to the skills themselves.
- The author states that Taste Skill has no official token, coin or crypto project.

## Licensing note

Released under the MIT License, copyright 2026 Leonxlnx.

## Installation

You need Node.js to run the installer and an AI coding assistant that supports
skills, such as Claude Code, Cursor or Codex.

1. Open a terminal in your project folder.
2. Run `npx skills add https://github.com/Leonxlnx/taste-skill` to install every
   skill, or add `--skill "design-taste-frontend"` to install only the default one.
   The value after `--skill` is the install name from the table above, not the
   folder name.
3. Restart your assistant so it picks up the new skills.
4. Ask for a UI task, such as "build a landing page for a coffee roaster", and check
   that the result follows the skill's design rules.

You can also copy any `SKILL.md` from the repo into your project, or paste it into a
ChatGPT or Codex conversation.
