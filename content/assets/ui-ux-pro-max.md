---
slug: ui-ux-pro-max
type: claude-skill
title: UI UX Pro Max
fileName: ui-ux-pro-max.skill
summary: >-
  Gives your coding agent a searchable design database (styles, palettes, font
  pairings, UX rules and stack guidelines) so it generates a full design system
  before writing UI code, and never installs software on your machine. If Python
  is missing, it asks you to install it.
category: web-design
tags: [ui, ux, design-system, accessibility, tailwind, react]
tools: [claude-code, cursor, windsurf, codex, gemini, copilot]
license: MIT
author: Next Level Builder
source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
stars: 132500
verified: true
install: |
  # Claude Code: install from the plugin marketplace
  /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
  /plugin install ui-ux-pro-max@ui-ux-pro-max-skill

  # Any other assistant: use the CLI (requires Node.js)
  npm install -g ui-ux-pro-max-cli
  cd /path/to/your/project
  uipro init --ai claude
installLang: bash
---

## Overview

**UI UX Pro Max** is a design-intelligence skill for AI coding assistants. It
bundles a local, searchable dataset of 79 UI styles (50 active), 192 product
palettes and reasoning rules, 74 font pairings, 119 UX guidelines, 25 chart types
and guidelines for 22 stacks, from React and Next.js to SwiftUI, Flutter and
Jetpack Compose. The agent queries that data when it makes design decisions.

It is aimed at developers who build interfaces with an AI agent. The search runs
through a small Python script with no external dependencies and makes no network
calls.

## How it works

When your request involves UI structure, visual design, interaction or
accessibility, the skill activates on its own. For a new page or project it first
generates a complete design system, then supplements it with narrower searches.

1. **Analyze the request**: product type, audience, style keywords, and the stack,
   detected from files like `package.json` or `pubspec.yaml`.
2. **Generate a design system**: a reasoning engine matches your product against
   192 industry rules and returns a pattern, style, colors, typography, key effects
   and anti-patterns to avoid.
3. **Search by domain**: style, color, typography, charts, UX, landing pages,
   icons or GSAP animation presets.
4. **Apply stack guidelines**: version-aware advice for the framework you use.
5. **Check before delivering**: a pre-delivery checklist covers contrast, focus
   states, reduced motion and responsive widths.

The design system can be saved to `design-system/<project>/MASTER.md`, with
per-page overrides in `pages/`, so later sessions reuse the same decisions.

## Examples

```txt
You: Build a landing page for my beauty spa.
Agent (with skill): Runs the design-system search, returns a hero-centric layout
with social proof, a soft UI style, a sage and rose palette, a Cormorant Garamond
and Montserrat pairing, and a list of things to avoid, then writes the page.
```

You can also call the search script directly:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech banking" --design-system -p "MyApp"
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react
```

## Notes

- The README labels this repository the "Basic" version. A paid Premium version
  with brand identity, logo and image-generation features is sold separately at
  uupm.cc. Everything described here is in the open-source repository.
- The skill is built for UI work. It skips backend logic, databases and
  infrastructure.

## Licensing note

Released under the MIT License, copyright 2024 Next Level Builder.

## Installation

You need Python 3 for the search script (check with `python3 --version`). Claude
Code users need Claude Code; everyone else needs Node.js for the CLI.

1. In Claude Code, run `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`
   and then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill`.
2. For Cursor, Windsurf, Codex CLI, Gemini CLI, Copilot and others, install the
   CLI with `npm install -g ui-ux-pro-max-cli`.
3. Go to your project folder and run `uipro init --ai <platform>`, for example
   `uipro init --ai cursor`. Add `--global` to install it for every project.
4. Restart your assistant so it picks up the new skill.
5. Ask for a UI task, such as "build a landing page for my SaaS product". The
   agent should run a design-system search before writing code. Copilot, Kiro and
   Roo Code use the slash command `/ui-ux-pro-max` instead of auto-activation.
