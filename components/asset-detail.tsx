import {
  Bot,
  BadgeCheck,
  ExternalLink,
  Quote,
  Scale,
  ScrollText,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Workflow,
} from "lucide-react";
import { AssetCard } from "@/components/asset-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CopyBlock } from "@/components/copy-block";
import { GithubIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { VoteButton } from "@/components/vote-button";
import type { Asset } from "@/lib/content";
import { related } from "@/lib/content";
import { categoryBySlug, toolLabel, typeLabels } from "@/lib/data";
import type { AssetType } from "@/lib/data";
import { breadcrumbSchema, howToSchema, softwareAppSchema } from "@/lib/seo";

const typeIcon: Record<AssetType, React.ComponentType<{ className?: string }>> = {
  "claude-skill": Sparkles,
  "mcp-server": Server,
  copilot: Bot,
  "ai-workflow": Workflow,
  "cursor-rule": ScrollText,
};

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function AssetDetail({ asset }: { asset: Asset }) {
  const Icon = typeIcon[asset.type];
  const category = categoryBySlug(asset.segment);
  const relatedAssets = related(asset);

  const schemas: object[] = [
    softwareAppSchema(asset),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: category?.name ?? asset.type, path: `/${asset.segment}` },
      { name: asset.title },
    ]),
  ];
  if (asset.install) schemas.push(howToSchema(asset));

  return (
    <article className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6">
      <JsonLd data={schemas} />
      <Breadcrumbs
        items={[
          { label: "~", href: "/" },
          { label: category?.name ?? asset.type, href: `/${asset.segment}` },
          { label: asset.title },
        ]}
      />

      {/* header */}
      <header className="mt-8 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-muted">
            <Icon className="h-4 w-4 text-accent" />
            {typeLabels[asset.type]}
          </span>
          {asset.verified && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-accent">
              <ShieldCheck className="h-4 w-4" /> verified · tested by us
            </span>
          )}
          {asset.official && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted">
              <BadgeCheck className="h-4 w-4" /> published by the official vendor
            </span>
          )}
          {typeof asset.stars === "number" && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted">
              <Star className="h-4 w-4" /> {formatStars(asset.stars)} stars
              {asset.starsNote ? ` · ${asset.starsNote}` : ""}
            </span>
          )}
        </div>

        <div className="mt-4 font-mono text-sm text-accent-strong">
          {asset.fileName}
        </div>
        <h1 className="mt-1 font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">
          {asset.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{asset.summary}</p>
      </header>

      <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* main */}
        <div className="min-w-0">
          {asset.video && (
            <div className="mb-8 aspect-video overflow-hidden rounded-xl border border-line">
              <iframe
                src={asset.video}
                title={`${asset.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: asset.body }}
          />

          {asset.testimonials.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-semibold text-fg">
                What people say
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {asset.testimonials.map((t, i) => (
                  <figure
                    key={i}
                    className="rounded-xl card-surface p-5"
                  >
                    <Quote className="h-5 w-5 text-accent" />
                    <blockquote className="mt-3 text-sm leading-relaxed text-fg/90">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-4 font-mono text-xs text-muted">
                      — {t.author}
                      {t.role ? `, ${t.role}` : ""}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-3 font-mono text-[11px] text-muted">
                // live user reviews are coming in a later release
              </p>
            </section>
          )}
        </div>

        {/* sidebar */}
        <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
          <VoteButton slug={asset.slug} />

          {asset.install && (
            <div>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">
                $ install
              </h3>
              <CopyBlock
                code={asset.install}
                lang={asset.installLang}
                label="install"
              />
            </div>
          )}

          <div className="rounded-xl card-surface p-5">
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">
              details
            </h3>
            <dl className="space-y-3 text-sm">
              <Row icon={User} label="Author">
                {asset.author}
              </Row>
              <Row icon={Scale} label="License">
                {asset.license}
              </Row>
              {typeof asset.stars === "number" && (
                <Row icon={Star} label="GitHub stars">
                  {formatStars(asset.stars)}
                  {asset.starsNote ? (
                    <span className="block text-[11px] text-muted">
                      {asset.starsNote}
                    </span>
                  ) : null}
                </Row>
              )}
            </dl>

            <div className="mt-4 border-t border-line pt-4">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                works with
              </div>
              <div className="flex flex-wrap gap-1.5">
                {asset.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-line px-2 py-0.5 text-[11px] text-muted"
                  >
                    {toolLabel(t)}
                  </span>
                ))}
              </div>
            </div>

            {asset.source && (
              <a
                href={asset.source}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-fg transition-colors hover:border-line-strong"
              >
                <GithubIcon className="h-4 w-4" /> View source
                <ExternalLink className="h-3.5 w-3.5 text-muted" />
              </a>
            )}
          </div>
        </aside>
      </div>

      {relatedAssets.length > 0 && (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="mb-6 font-display text-xl font-semibold text-fg">
            Related assets
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedAssets.map((a) => (
              <AssetCard key={a.slug} asset={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="inline-flex items-center gap-2 text-muted">
        <Icon className="h-4 w-4" />
        {label}
      </dt>
      <dd className="font-mono text-fg">{children}</dd>
    </div>
  );
}
