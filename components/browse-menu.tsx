"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Bot, ChevronDown, ScrollText, Server, Sparkles, Workflow } from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  server: Server,
  bot: Bot,
  workflow: Workflow,
  scroll: ScrollText,
};

export function BrowseMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <Link
        href="/browse"
        onClick={() => setOpen(false)}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface hover:text-fg ${
          open ? "bg-surface text-fg" : "text-muted"
        }`}
      >
        Browse
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-accent" : ""}`}
        />
      </Link>

      {/* Kept in the DOM while closed so the category links stay crawlable. */}
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="relative w-96 overflow-hidden rounded-xl border border-line-strong bg-bg-2 p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6),0_0_40px_-10px_var(--accent-glow)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"
          />
          <div className="px-3 pb-1.5 pt-2 font-mono text-[11px] text-muted">
            <span className="text-accent">$</span> ls ~/assets --type
          </div>

          {categories.map((c) => {
            const Icon = iconMap[c.icon];
            return (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className="group/item relative flex items-center gap-3 rounded-lg px-3 py-2.5 outline-none transition-all duration-150 hover:bg-gradient-to-r hover:from-accent/15 hover:to-transparent focus-visible:bg-gradient-to-r focus-visible:from-accent/15 focus-visible:to-transparent"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-accent opacity-0 shadow-[0_0_10px_var(--accent)] transition-opacity group-hover/item:opacity-100 group-focus-visible/item:opacity-100"
                />
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted transition-all duration-150 group-hover/item:border-accent/50 group-hover/item:text-accent group-hover/item:shadow-[0_0_16px_var(--accent-glow)] group-focus-visible/item:border-accent/50 group-focus-visible/item:text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-fg transition-colors group-hover/item:text-accent group-focus-visible/item:text-accent">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{c.blurb}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-150 group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100" />
              </Link>
            );
          })}

          <Link
            href="/browse"
            onClick={() => setOpen(false)}
            className="group/all mt-1 flex items-center justify-between rounded-lg border-t border-line px-3 py-2.5 text-sm text-accent outline-none transition-colors hover:bg-accent/10 focus-visible:bg-accent/10"
          >
            Browse all assets
            <ArrowRight className="h-4 w-4 transition-transform group-hover/all:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
