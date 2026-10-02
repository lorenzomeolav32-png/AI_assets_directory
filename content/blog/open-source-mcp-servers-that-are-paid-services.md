---
slug: open-source-mcp-servers-that-are-paid-services
title: Open source MCP servers that are really paid services
summary: >-
  An MCP repo can be MIT licensed and still be a client for a paid service. How
  to tell what is open, what is hosted, and what leaves your machine.
tags: [mcp, hosted, security, open-source]
date: 2026-10-02
reviewBy: 2027-04-02
---

"Open source MCP server" covers at least three different things. It can be a
server you run entirely on your own machine. It can be an open client for a
hosted service, with a free tier or a paid plan behind it. Or it can be a repo
that holds setup files and docs pointing at a URL. All three turn up in search
results under the same label, and the MIT license in the repo covers very
different amounts of what you are about to connect.

The license covers what is in the repo. A hosted service has its own terms of
service, its own pricing, and its own idea of what happens to your data. When a
listing says "MIT" and stops there, it has answered the smallest part of the
question.

## Security checklists cover another half

There are good security checklists for MCP servers. Rafter's
[review checklist](https://rafter.so/blog/mcp-server-security-review-checklist)
treats a server as a process on your machine and walks through the publisher,
the install-time behavior, the tools it exposes, how credentials are handled, the
update model, logging, and a kill switch. It also says that most servers in the
current ecosystem fail at least three of those checks.

That is the right way to look at a process you run locally. This post covers the
other half: what the license promises, and what runs somewhere else. The two
questions need separate answers, and a server can pass one and fail the other.

## The server is open, the data isn't

[ByteAsk Embedded MCP](/mcp-servers/byteask-embedded-mcp) is a clean example. The
server code is open under MIT, and you can run it with `uv` in a few commands. It
exposes three tools: `search_docs`, `get_context`, and `request_document`. It
returns verbatim snippets from firmware and embedded reference documents with a
section and page citation, or an honest "no confident match" instead of an
invented register value.

It ships with a small sample backend, so it works right away, though only on a
couple of illustrative records. The full document library and the retrieval
engine sit behind a hosted endpoint, and those parts are proprietary. The listing
says so directly: only the server code is open. If you use the hosted endpoint,
your queries go there.

## The client is open, the backend is a service

[ContextStream](/mcp-servers/contextstream) is MIT licensed on the client side.
It gives coding agents memory across sessions and semantic code search. The
search backend is a separate cloud service with a free tier of 10,000 monthly
credits and no card required. The details worth reading are in its data handling
docs. Indexing sends eligible project files to the hosted search by default.
Transcript saving and hook-based capture are on by default too, and both can be
turned off in its data handling settings. It can also capture local Git metadata
such as commit hashes, branch names, and aggregate diff stats.

For a public project, that is fine. For a private codebase, it is a decision to
make before you connect, not after. The install is a `curl | sh` script or a
hosted endpoint for clients that support OAuth.

## Paying per call, done well

[SocialCrawl MCP](/mcp-servers/socialcrawl-mcp) puts 575 endpoints across 65
platforms behind one server. You need an API key, and signup gives you 100 free
credits with no card. Four of its ten tools work without a key. The part we like
is how it handles money. A pricing tool quotes the credit cost of a call before
you make it, and requests are validated locally, so a malformed one fails without
spending anything. For a paid backend, those are the right instincts: tell people
the price first, and don't charge for mistakes.

## Side by side

| Server | What is open | What is hosted | Free to try |
| --- | --- | --- | --- |
| ByteAsk Embedded MCP | Server code, MIT | Document library and retrieval engine | Yes, on a small sample set |
| ContextStream | MCP server and client, MIT | Search backend | 10,000 monthly credits, no card |
| SocialCrawl MCP | Server, MIT | The data API | 100 credits, no card |

## The repo that is only config

The third kind is the one we skip. A repo we turned down this month was labeled an
MCP server, but it held a setup script, configuration snippets for a handful of
editors, and a README with plans starting at $99 a month. The MIT license covered
the config and the documentation. The service itself ran elsewhere, under its own
terms of service.

The product may be fine. A visitor just had no code to read or run, so there was
nothing for a directory to describe beyond a URL. It did offer free tools through
a no-account endpoint, which is a point in its favor. It wasn't enough to carry a
listing on its own, since the free tools were part of the hosted service too.

## Five questions before you connect

1. Where does the code run? A local process you can read is a different thing
   from a URL you point your agent at.
2. What leaves your machine? Look for indexing, transcript capture, and
   telemetry, and check whether each can be turned off.
3. What does it cost, and is there a real free tier? Check whether a card is
   required, and whether the free tier lets you test the actual feature or only a
   demo.
4. What can the key do? Prefer servers that issue scoped keys. One server we
   looked at offers read-only, build, and full scopes, which means you can give an
   agent that only needs to look a key that can only look.
5. What does the license cover? Usually the repo. The hosted service has its own
   terms.

## How we list them

We say the hosted part out loud. ContextStream carries a `hosted` tag, and the
listings for ContextStream and ByteAsk each name which part is open and which
isn't. We still list them, because open client code with a free tier is useful,
and hiding where your data goes would not be. What decides it is whether the page
can give you something to inspect and an honest description of the rest.

If you maintain a server like this, that is the shape of listing that works best.
Put in the README what the repo contains, what runs on your side, what the free
tier includes, and what the client sends by default. Then
[send it in](/submit).
