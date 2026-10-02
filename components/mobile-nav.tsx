"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { categories } from "@/lib/data";
import { SITE_GITHUB } from "@/lib/site";

const nav = [
  { label: "Browse", href: "/browse" },
  { label: "Learn", href: "/learn" },
  { label: "Blog", href: "/blog" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change and lock body scroll while the sheet is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function openSearch() {
    setOpen(false);
    // CommandMenu listens globally for Cmd/Ctrl+K.
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-bg/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-bg px-4 py-4 shadow-2xl sm:px-6">
            <nav className="flex flex-col gap-0.5">
              {nav.map((n) => (
                <div key={n.href} className="flex flex-col gap-0.5">
                  <Link
                    href={n.href}
                    className="rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
                  >
                    {n.label}
                  </Link>
                  {n.href === "/browse" &&
                    categories.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="ml-4 rounded-md border-l border-line px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
                      >
                        {c.name}
                      </Link>
                    ))}
                </div>
              ))}
            </nav>

            <div className="my-3 h-px bg-line" />

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={openSearch}
                className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <Search className="h-4 w-4" />
                Search
              </button>

              <a
                href={SITE_GITHUB}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <GithubIcon className="h-4 w-4" />
                Star on GitHub
              </a>

              <Link
                href="/advertise"
                className="flex items-center justify-center rounded-lg border border-accent/40 px-3.5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
              >
                Advertise
              </Link>

              <Link
                href="/submit"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3.5 py-2.5 text-sm font-medium text-accent-ink shadow-[0_0_24px_var(--accent-glow)]"
              >
                Submit
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
