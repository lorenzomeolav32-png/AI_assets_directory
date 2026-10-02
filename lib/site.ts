// Canonical site constants — single source of truth for SEO/metadata.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiassetsdirectory.com"
).replace(/\/+$/, "");

export const SITE_NAME = "AI Assets Directory";

export const SITE_TAGLINE =
  "The verified directory & guides to build with Claude Skills, MCP servers and AI agents.";

export const SITE_DESCRIPTION =
  "Open-source directory of curated, tested Claude Skills, MCP servers, Copilot agents, AI workflows and Cursor rules — copy, install, ship.";

/** Contact + ownership. Single source of truth for legal/company pages. */
export const SITE_OPERATOR = "AI Assets Directory";
export const SITE_EMAIL = "contact@aiassetsdirectory.com";
export const SITE_GITHUB = "https://github.com/lorenzomeolav32-png/AI_assets_directory";

/** Companion open-source list, cross-linked for backlinks + discovery. */
export const AWESOME_LIST_URL =
  "https://github.com/lorenzomeolav32-png/awesome-claude-skills-mcp-servers";

/** Byline shown on blog/learn articles (E-E-A-T: a real, identifiable author). */
export const AUTHOR_NAME = "Lorenzo Meola";
export const AUTHOR_BIO =
  "I use agentic AI daily in my day job to build tools, and I've spent months learning how these systems actually work under the hood. I'm not an AI expert by title, just someone building this directory so other developers can find AI assets that are genuinely useful and verified to work, not just indexed.";

/** Human-readable date the legal pages were last reviewed. */
export const LEGAL_LAST_UPDATED = "September 1, 2026";

/** Absolute URL from a root-relative path. */
export const abs = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
