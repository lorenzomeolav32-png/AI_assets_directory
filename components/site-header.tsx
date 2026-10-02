import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandMenu } from "@/components/command-menu";
import { MobileNav } from "@/components/mobile-nav";
import { BrowseMenu } from "@/components/browse-menu";
import { GithubIcon } from "@/components/icons";
import { cards } from "@/lib/content";
import { SITE_GITHUB } from "@/lib/site";

const nav = [
  { label: "Learn", href: "/learn" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-surface text-accent shadow-[0_0_20px_var(--accent-glow)]">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="font-mono text-sm tracking-tight">
            <span className="text-muted">~/</span>
            <span className="text-fg">ai_assets_directory</span>
            <span className="ml-0.5 text-accent">_</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          <BrowseMenu />
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <MobileNav />
          <CommandMenu items={cards} />

          <a
            href={SITE_GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-muted transition-colors hover:border-line-strong hover:text-fg sm:flex"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="font-mono text-xs">star</span>
          </a>

          <ThemeToggle />

          <Link
            href="/advertise"
            className="hidden h-9 items-center rounded-lg border border-accent/40 px-3.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10 sm:flex"
          >
            Advertise
          </Link>

          <Link
            href="/submit"
            className="group hidden h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-sm font-medium text-accent-ink shadow-[0_0_24px_var(--accent-glow)] transition-transform hover:scale-[1.03] sm:flex"
          >
            Submit
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
