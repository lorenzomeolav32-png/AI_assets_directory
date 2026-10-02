import Link from "next/link";
import { ArrowRight, Boxes, ShieldCheck, Terminal } from "lucide-react";
import { AssetCard } from "@/components/asset-card";
import { AdvertiseBanner } from "@/components/advertise-banner";
import { CategoryTile } from "@/components/category-tile";
import { HeroSearchBar } from "@/components/hero-search-bar";
import { GithubIcon } from "@/components/icons";
import { LeaderboardTable } from "@/components/leaderboard-table";
import type { Metadata } from "next";
import { categories, toolLabel, worksWith } from "@/lib/data";
import { allAssets, featuredCards } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_GITHUB, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "AI Assets Directory | Open-Source Claude Skills, MCP Servers & Agents",
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  eyebrow: "open-source AI assets for developers",
});

const totalAssets = allAssets.length;

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-20 sm:px-6 sm:pt-28">
        <div className="animate-rise">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
            open-source · developer-first · no fluff
          </div>

          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            The curated directory for{" "}
            <span className="text-accent text-glow">Claude Skills</span>, MCP
            servers &amp; AI agents.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {SITE_TAGLINE}
          </p>

          {/* terminal search bar */}
          <div className="mt-9 max-w-2xl">
            <HeroSearchBar />

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={c.href}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* stats */}
          <dl className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            {[
              [`${totalAssets}+`, "curated assets"],
              ["5", "AI tools covered"],
              ["100%", "open-source"],
              ["MIT · Apache", "permissive licenses"],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl font-semibold text-fg">
                  {n}
                </dt>
                <dd className="font-mono text-xs text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Works-with marquee ───────────────────────────────────────────── */}
      <section className="relative mt-10 overflow-hidden border-y border-line py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max marquee items-center gap-10 pr-10">
          {[...worksWith, ...worksWith].map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="flex items-center gap-2 font-mono text-sm text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              {toolLabel(tool)}
            </span>
          ))}
        </div>
      </section>

      {/* ── Advertise ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <AdvertiseBanner />
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
              // browse by type
            </p>
            <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
              Five kinds of assets, one hub
            </h2>
          </div>
          <Link
            href="/browse"
            className="hidden items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-fg sm:flex"
          >
            browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
          <Link
            href="/submit"
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-dashed border-line p-6 transition-colors hover:border-line-strong"
          >
            <div className="font-mono text-[11px] text-muted">
              ~/contribute
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-fg">
                Missing something?
              </h3>
              <p className="mt-2 text-sm text-muted">
                Submit an open-source asset and get credited as the author.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                submit an asset
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Featured assets ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
              // hand-picked
            </p>
            <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
              Featured assets
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCards(6).map((a) => (
            <AssetCard key={a.slug} asset={a} />
          ))}
        </div>
      </section>

      {/* ── Most voted ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
              // community voted
            </p>
            <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
              Most voted assets
            </h2>
          </div>
        </div>

        <LeaderboardTable />
      </section>

      {/* ── Value props ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Curated & tested",
              body: "Every listing is reviewed by a human, with a last-verified date and a works-with matrix, not a 100k-item crawl.",
            },
            {
              icon: Boxes,
              title: "Cross-tool by design",
              body: "Claude, Cursor, Copilot and n8n in one consistent taxonomy, so you compare and switch without ten browser tabs.",
            },
            {
              icon: Terminal,
              title: "Copy & ship",
              body: "One-click copy of the exact SKILL.md, mcp.json or rule file, with install steps that actually work.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-xl card-surface p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-accent">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
          <div
            className="pointer-events-none absolute inset-x-0 -top-24 h-48 blur-3xl"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 100%, var(--accent-glow), transparent)",
            }}
          />
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            // join the build
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-fg sm:text-4xl">
            Ship faster with assets that actually work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Browse the directory, star the repo, and get the best new AI assets
            in your inbox.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/browse"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 font-medium text-accent-ink shadow-[0_0_28px_var(--accent-glow)] transition-transform hover:scale-[1.03]"
            >
              Browse assets <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={SITE_GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-bg px-5 font-medium text-fg transition-colors hover:border-line-strong"
            >
              <GithubIcon className="h-4 w-4" /> Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
