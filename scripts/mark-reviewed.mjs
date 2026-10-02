#!/usr/bin/env node
// Marks an article as reviewed: moves `reviewBy` forward and updates its row in
// SEO_MAINTENANCE.md. With --changed it also sets `updated: <today>`, which is
// the date readers see. Only use --changed when the content really changed.
//
//   npm run review:mark -- <slug>             reviewed, nothing changed
//   npm run review:mark -- <slug> --changed   reviewed and content edited
//   add --fast or --evergreen to force the cadence (default: same as before)

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const changed = args.includes("--changed");

if (!slug) {
  console.error("Uso: npm run review:mark -- <slug> [--changed] [--fast|--evergreen]");
  process.exit(2);
}

const section = ["blog", "learn"].find((s) => existsSync(join(ROOT, "content", s, `${slug}.md`)));
if (!section) {
  console.error(`No existe content/blog/${slug}.md ni content/learn/${slug}.md`);
  process.exit(2);
}

const iso = (d) => d.toISOString().slice(0, 10);
const addMonths = (d, n) => {
  const r = new Date(d);
  r.setUTCMonth(r.getUTCMonth() + n);
  return r;
};

const today = new Date();
const todayIso = iso(today);

const file = join(ROOT, "content", section, `${slug}.md`);
const raw = readFileSync(file, "utf8");
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error("El archivo no tiene frontmatter.");
  process.exit(2);
}

const field = (name) => fmMatch[1].match(new RegExp(`^${name}:\\s*(\\S+)\\s*$`, "m"))?.[1];
const date = field("date");
const oldReviewBy = field("reviewBy");

// Cadence: infer from the original gap between date and reviewBy (≤3 months = fast).
let months;
if (args.includes("--fast")) months = 2;
else if (args.includes("--evergreen")) months = 6;
else if (date && oldReviewBy) {
  const gap = (new Date(oldReviewBy) - new Date(date)) / (30 * 24 * 3600 * 1000);
  months = gap <= 3 ? 2 : 6;
} else {
  console.error("No puedo inferir la cadencia: añade --fast o --evergreen.");
  process.exit(2);
}

const newReviewBy = iso(addMonths(today, months));

let fm = fmMatch[1];
fm = /^reviewBy:/m.test(fm)
  ? fm.replace(/^reviewBy:.*$/m, `reviewBy: ${newReviewBy}`)
  : `${fm}\nreviewBy: ${newReviewBy}`;

if (changed) {
  fm = /^updated:/m.test(fm)
    ? fm.replace(/^updated:.*$/m, `updated: ${todayIso}`)
    : fm.replace(/^(date:.*)$/m, `$1\nupdated: ${todayIso}`);
}

writeFileSync(file, raw.replace(fmMatch[1], () => fm));

// Keep the table in SEO_MAINTENANCE.md in sync (if the article has a row).
const seoPath = join(ROOT, "SEO_MAINTENANCE.md");
let tableNote = "sin fila en SEO_MAINTENANCE.md (añádela a mano)";
if (existsSync(seoPath)) {
  const seo = readFileSync(seoPath, "utf8");
  const rowRe = new RegExp(
    `^(\\| \\[${section}\\] ${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\| [^|]+\\| [^|]+\\| )[^|]+(\\| ).*\\|$`,
    "m",
  );
  if (rowRe.test(seo)) {
    writeFileSync(seoPath, seo.replace(rowRe, `$1${newReviewBy} $2✅ ${todayIso} |`));
    tableNote = "fila de SEO_MAINTENANCE.md actualizada";
  }
}

console.log(`[${section}] ${slug}`);
console.log(`  reviewBy: ${oldReviewBy ?? "(ninguno)"} -> ${newReviewBy} (${months} meses)`);
console.log(
  changed
    ? `  updated:  ${todayIso} (el lector verá "Updated")`
    : "  updated:  sin cambios (no se tocó el contenido)",
);
console.log(`  ${tableNote}`);
