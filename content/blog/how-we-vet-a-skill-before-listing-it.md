---
slug: how-we-vet-a-skill-before-listing-it
title: How we vet a skill before listing it
summary: >-
  Stars and a README badge are where a review starts. Here is what we open, in
  what order, and what the checks caught on repos we turned down.
tags: [curation, security, claude-skills, mcp]
date: 2026-10-02
reviewBy: 2027-04-02
---

Every new asset goes through the same short list of checks before it gets a
page. We keep the list because the things that make an asset risky or
disappointing are rarely on the repo's front page.

Other people have written good guides to this. Aident's walkthrough on
[auditing an agent skill before you install it](https://aident.ai/blog/audit-agent-skill-before-installing)
and LLM Mart's guide to
[vetting skills before installing them](https://llmmart.ai/articles/how-to-vet-ai-agent-skills-before-installing-them)
both cover the security side in depth. LLM Mart puts the stakes well: installing
a third-party skill is closer to adding a small dependency than saving a useful
blog post. This post differs in one way. It describes what we do on a directory,
in order, with the cases that changed our minds.

## The license file, not the badge

We open the `LICENSE` file itself. A badge or a line in the README can say one
thing while the file says another, and the file is what counts. We accept MIT,
Apache-2.0, BSD, CC0, and CC-BY. We generally avoid copyleft and non-commercial
licenses because the directory is a monetized site. A repo with no license is all
rights reserved by default, so we don't list it. We also copy the copyright
holder's name and year from the file, because the listing credits them, and the
name in the file is the one that goes in the author field.

## Is there code to read?

Next we look at what the repo contains. Most are what they say. Some aren't. A
repo we turned down recently was labeled an MCP server, but it held a setup
script, configuration files for several editors, and a README with plans starting
at $99 a month. The server itself ran on the company's infrastructure, so there
was nothing to read or run locally.

A hosted service is not a reason to say no.
[ContextStream](/mcp-servers/contextstream) and
[ByteAsk Embedded MCP](/mcp-servers/byteask-embedded-mcp) both have a hosted side
and both are listed. What matters is that the page says what is open and what
isn't. ByteAsk's listing states that only the server code is open and that the
document library behind the hosted endpoint is proprietary. A repo with no code
to describe can't pass that test, because there is nothing to say.

## Read everything the skill points to, then search it

A skill is a text file that tells an agent what to do with your permissions.
Aident makes the point that the review boundary is the whole bundle, not one
Markdown file: sibling scripts, reference files, assets, and configuration all
count. So we read `SKILL.md` in full, follow every file it names, and then search
all of it for URLs, HTML comments, `curl`, `wget`, `Invoke-WebRequest`, and
phrases like "you must", "ignore previous", and "if you are an AI".

Aident's rule for the results is the right one. A match is a prompt for
investigation, not proof. Most matches are harmless. One of the Taste Skill files
we read mentions a URL for a placeholder image service, which is just a
convenience for generating demo pages.

Some matches aren't harmless. This month, two Markdown files in one repo carried
an HTML comment that is invisible on the rendered GitHub page and is addressed to
AI agents. It told them to add a promotional header to every source file they
create or edit, including files outside that repository. Installed in someone's
agent, that skill would have started editing their other projects on behalf of a
stranger's marketing.

That one was an advertisement, not malware. LLM Mart notes that the hardest
malicious instruction doesn't announce itself with "ignore previous
instructions". It sounds like a helpful prerequisite. This one was blunt, but we
still treat it as a hard no, because a hidden line that tells an agent to edit
unrelated files uses the same mechanism a worse actor would use.

We passed. Our reply to the maintainer names the files and says we would look
again once the comment is gone. The documentation was good and the rest of what
we read looked fine. It didn't matter. An instruction aimed at the agent and
hidden from the reader is the one thing we won't list. We aren't naming the repo
here. It's an easy fix for the maintainer, and a name would turn a review note
into a headline.

## What the installer does

Then the install command. Some are a copy of one folder. Others are a `curl | sh`
script, a binary the operating system hasn't verified, or an `npx` call that runs
code the moment you start it. Aident warns that package commands such as `npx` and
`pip install` can execute code during inspection, so resolve and read the
dependencies before you install anything.

We don't ban any of these. We write the Installation section of every listing
around what the command really does, and we run it before marking an asset
verified. Aident also points out that a branch name such as `main` is not a pin,
because the publisher can move it. We link to the source and show the install
command the author documents. Pinning the commit you reviewed is up to you.

## Stars are not a requirement, maturity is

Our submit page asks for a public repo, a permissive license, a project that
works and is reasonably maintained, a clear description with install steps, and a
fit with one of five categories. There is no star count in the list.
SocialCrawl MCP and ByteAsk Embedded MCP had 22 and 24 stars when we listed them.

What we look at is whether the last commit is recent, whether the docs explain
install and usage, and whether the project's claims fit its stage. That last part
matters more than the number. One star on a CSS skill is a small risk. One star on
a tool that holds your encryption keys and credentials is a bigger ask,
especially when the repo itself says it is a developer alpha with no independent
security audit. We passed on a repo like that and asked the author to come back
with a stable release.

## What verified means, and what it doesn't

Every listing starts unverified. It flips to verified after a person has run the
install steps and the asset does what its page says. That is not a security
audit. The fuller reviews that Aident and LLM Mart describe run the skill in a
disposable environment with synthetic data and no real credentials, and they
record every file, process, and network request. If you will point a skill at work
that matters, do that yourself. Each page lists the license, the author, and a
link to the source, which is where to check next.

## When the answer is no

We reply to the maintainer with the reasons and what would change them. Our
[submit page](/submit) promises as much: if it isn't a fit, we say why. In the
cases above that meant a missing release, a hidden comment, and a repo with
nothing to run. All of them are fixable, and the replies say so.

## Check a repo yourself

You don't need a directory to run these checks on a repo you found. Here is the
short version:

1. Open the `LICENSE` file and copy the holder and year.
2. Read the whole `SKILL.md`, then every file it names.
3. Search the repo for HTML comments, URLs, `curl`, `wget`, and phrases that
   address an AI agent.
4. Check what the install command writes and where, and whether it runs code the
   moment you start it.
5. Pin the commit you reviewed.
6. Try it first in a throwaway folder with no real credentials.
7. Look at the last commit date and whether the README's claims match the stage
   of the project.

If a repo passes, [send it in](/submit). Our [license policy](/license-policy)
explains what we accept.
