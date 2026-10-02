---
slug: design-skills-for-ai-agents-2026
title: "Design skills for AI agents in 2026: which to install first"
summary: >-
  Agents build UI that works and looks like everyone else's. Four skills push
  back in different ways. Here is which one to install first.
tags: [design, frontend, claude-skills, ai-agents]
date: 2026-10-02
reviewBy: 2027-04-02
---

Open a page an agent built for you and you can often tell within a second what
made it: the purple gradient, four identical cards in a row, the default font.
One [survey of frontend design skills](https://ruoqijin.com/blog/frontend-design-skills-ai-agents)
calls the cause distributional convergence. A model nobody steers reproduces
the statistical center of what it has seen. Emil Kowalski, who wrote one of the
skills below, describes the same thing at the level of details. Agents pick
`ease-in` for an enter animation, or a solid border where a soft shadow would
look better. Each mistake is small. Together they make an interface look
unfinished.

A skill pushes back by handing the agent constraints before it writes any code.
The four covered here come at the problem from different directions, and they
overlap enough that installing all of them at once is a mistake. This post
covers what each one does, where it stops, and how to combine them.

## Frontend Design: write the brief first

[Frontend Design](/claude-skills/frontend-design) is Anthropic's own skill.
Before any code, the agent writes a short brief covering the purpose of the
interface, the tone, the constraints, and the one thing a visitor should
remember. Then it commits to a direction (brutalist, editorial, refined and
minimal, and others) and builds it as real code, with CSS variables for color, a
deliberate font pairing, and one orchestrated load animation. It steers away from
the defaults that give AI interfaces their look: Inter and Roboto, purple
gradients, three identical cards.

It is the lightest option here, which makes it a good first install. It changes
how the agent starts without adding a dataset or a rule set to maintain. Its
limit is the one that comes with any strong direction. A bold aesthetic suits a
landing page better than an internal admin tool, where consistency matters more
than personality. The survey linked above makes the same point about the whole
family of anti-slop skills.

## UI UX Pro Max: a design system chosen for your product

[UI UX Pro Max](/claude-skills/ui-ux-pro-max) works from data. It bundles 79 UI
styles (50 of them active), 192 color palettes matched to product types, 74 font
pairings, 119 UX guidelines, and guidance for 22 stacks, from React and Next.js
to SwiftUI and Flutter. Ask for a new page and the agent searches that data for
a product type, a style, a palette, a landing page pattern, and typography. What
comes back is a design system. In the README's example, a beauty spa gets a
hero-centered layout with social proof, a soft UI style, a sage and rose
palette, a Cormorant Garamond and Montserrat pairing, and a list of things to
avoid, including neon colors and purple-pink gradients.

The result can be saved to `design-system/<project>/MASTER.md`, with page
overrides in a `pages/` folder. When the agent builds a page, it reads the page
file first and falls back to the master, so a second session reuses the first
session's decisions instead of inventing new ones. The search runs through a
small Python script that needs Python 3, has no other dependencies, and makes no
network calls. The README also mentions a paid Premium version with brand and
logo features. Our listing covers only the open source repo.

## Emil Kowalski Skills: motion and the details around it

[Emil Kowalski Skills](/claude-skills/emil-kowalski-skills) is a set of 14
skills. The main one, `emil-design-eng`, is a framework for deciding whether
something should animate at all. It starts with how often people will see the
effect. A command palette opened a hundred times a day should not animate. Hover
effects seen dozens of times a day should be removed or cut down. Modals and
drawers get a standard animation, and a first-run celebration can have some
delight. Then it picks the easing: `ease-out` for things entering and leaving,
`ease-in-out` for movement on screen, and custom curves such as
`cubic-bezier(0.23, 1, 0.32, 1)` in place of the weak built-in ones. UI
animations stay under 300ms, with 100 to 160ms for button feedback and 150 to
250ms for dropdowns.

When it reviews your code, it answers in a Before/After table with a reason on
every row. `transition: all 300ms` becomes a named property at 200ms. An entrance
from `scale(0)` becomes `scale(0.95)` with opacity. A popover that scales from
its center gets its transform origin moved to the trigger, while modals stay
centered.

The other skills are narrower. `break-ui` feeds a component long names, empty
lists, and huge counts, adds a "Demo data / Worst case" toggle, and reports what
broke before it fixes anything. `mobile-native` covers the 100vh bug and inputs
that zoom the page. `animate-expo` applies the same standard to React Native.
All of it is one person's judgment about taste, so expect a strong point of view.

## Taste Skill: dials and variants

[Taste Skill](/claude-skills/taste-skill) has 13 skills. The default one reads
your brief, infers a design language, and follows three numbers at the top of
its file, each from 1 to 10. Layout variance runs from centered and clean to
asymmetric. Motion intensity runs from hover effects to scroll and magnetic
motion. Visual density runs from spacious to dense dashboards.

The variants cover choices you have already made. Soft, minimalist, and brutalist
skills each fix a direction. A redesign skill audits an existing UI before
changing it. Three more generate reference images only, which you then hand to a
coding agent. The default skill is a v2 rewrite that its author still marks as
experimental, and the original v1 stays available if you depend on it. The
survey notes that Taste Skill has no automated tests or visual regression, so
you can't easily check that the agent obeyed its rules.

## Accessibility Expert: the check none of them replace

A page can look excellent and fail with a keyboard.
[Accessibility Expert](/copilot-agents/accessibility-expert) reviews code against
WCAG 2.1 and 2.2. It starts with a quick pre-check: the keyboard path, visible
focus, roles and names, and announcements for dynamic updates. It treats forms,
media, and single-page app behavior as separate categories, includes snippets for
React, Angular, and Vue, and ships commands for axe, pa11y, and Lighthouse along
with a GitHub Actions job. It pushes back when you ask it to remove focus
outlines. It is a Copilot agent, so it needs VS Code with Copilot rather than
Claude Code.

## The gap all of them share

None of these skills can see the page it is building. The survey reports that
several reviewers, OpenAI's own frontend guide among them, converge on one
addition: a loop where the agent opens a headless browser, takes screenshots at
different widths, and fixes what it finds.

We ran into the reason this week. Asset pages on this site cut text off on
phones, and no amount of design guidance would have caught it. Loading a page at
phone width and comparing the page width to the viewport did: 564 pixels against
379. The fix was one CSS class, `grid-cols-1`. Whatever skills you pick, give the
agent a browser.

## Which one first

| Situation | Start with |
| --- | --- |
| New project, no direction yet | Frontend Design |
| You need colors, fonts, and layout for a specific product type | UI UX Pro Max |
| The page exists but motion and details feel off | Emil Kowalski Skills |
| You want a controllable look, or a redesign | Taste Skill |
| You need a keyboard and screen reader review | Accessibility Expert |

## Combining them without conflict

Three of these set direction. Frontend Design commits to an aesthetic. UI UX Pro
Max generates a style and palette, and it has its own variance, motion, and
density dials. Taste Skill runs on dials of its own. Loaded together, they pull
the same button in different directions. Pick one to set direction, add one to
check details, and keep accessibility and a browser loop on top. Frontend Design,
Emil Kowalski Skills, and Accessibility Expert make a combination with almost no
overlap.

## Common mistakes

The first is installing every skill on a list because it has the most stars. The
survey cautions that install counts come from individual marketplaces and
aren't comparable, and that many roundups are published by vendors with something
to sell. The second is using a bold-aesthetic skill on a dashboard, where it
fights the consistency the product needs. The third is treating one author's
rules as a standard. The fourth is skipping the browser, which leaves the agent
building a page it has never seen.

Other roundups recommend skills we haven't reviewed, such as `impeccable` and
Vercel's `web-design-guidelines`, so they aren't listed here. The survey linked
above covers them if you want a second opinion. All five skills in this post
are MIT or Apache-2.0 licensed and marked verified in the directory, and their
pages mention the paid tier or sponsor links where a README has them.
