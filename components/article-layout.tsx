import { Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/table-of-contents";
import { GithubIcon } from "@/components/icons";
import { AUTHOR_NAME, AUTHOR_BIO, SITE_GITHUB } from "@/lib/site";
import type { Toc } from "@/lib/content";

// Trailing slash on each item, so a wrapped line never starts with a separator.
// Hidden on phones, where the row wraps and a slash at the line end looks stray.
const META_SEP =
  "after:ml-3 after:text-muted/50 after:content-['/'] after:font-normal max-sm:after:hidden";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ArticleLayout({
  breadcrumb,
  kind,
  title,
  summary,
  date,
  updated,
  author,
  readingTime,
  toc,
  body,
  tags,
}: {
  breadcrumb: { label: string; href?: string }[];
  kind?: string;
  title: string;
  summary: string;
  date: string;
  updated?: string;
  author: string;
  readingTime: number;
  toc: Toc;
  body: string;
  tags: string[];
}) {
  return (
    <article className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6">
      <Breadcrumbs items={breadcrumb} />

      <header className="mt-8 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
          {kind && (
            <span className="rounded border border-line px-2 py-0.5 text-accent">
              {kind}
            </span>
          )}
          <time dateTime={date} className={META_SEP}>
            Published {formatDate(date)}
          </time>
          {updated && updated !== date && (
            <time dateTime={updated} className={`${META_SEP} text-fg`}>
              Updated {formatDate(updated)}
            </time>
          )}
          <span className={`inline-flex items-center gap-1 ${META_SEP}`}>
            <Clock className="h-3.5 w-3.5" />
            {readingTime} min read
          </span>
          <span>by {author}</span>
        </div>

        <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{summary}</p>
      </header>

      <div className="grid gap-10 pt-10 lg:grid-cols-[1fr_220px]">
        <div className="min-w-0">
          <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {author === AUTHOR_NAME && (
            <div className="mt-10 flex items-start gap-4 rounded-xl card-surface p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface font-display text-sm font-semibold text-accent">
                {AUTHOR_NAME.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-fg">
                  {AUTHOR_NAME}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {AUTHOR_BIO}
                </p>
                <a
                  href={SITE_GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Project on GitHub
                </a>
              </div>
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents toc={toc} />
          </div>
        </aside>
      </div>
    </article>
  );
}
