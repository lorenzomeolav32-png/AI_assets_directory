import Link from "next/link";
import { ArrowUpRight, Megaphone } from "lucide-react";

export function AdvertiseBanner() {
  return (
    <aside
      aria-label="Advertise here"
      className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/20 via-accent/[0.07] to-transparent p-6 shadow-[0_0_60px_-15px_var(--accent-glow)] sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
      />
      <span className="absolute right-4 top-4 hidden rounded sm:block border border-accent/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
        Ad slot
      </span>

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink shadow-[0_0_28px_var(--accent-glow)]">
            <Megaphone className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
              Reach AI builders here
            </h2>
            <p className="mt-2 max-w-xl text-base text-muted">
              Sponsor the directory and put your tool in front of developers
              shipping with AI.
            </p>
          </div>
        </div>

        <Link
          href="/advertise"
          className="group inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-medium text-accent-ink shadow-[0_0_24px_var(--accent-glow)] transition-transform hover:scale-[1.03]"
        >
          See advertising options
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </aside>
  );
}
