import Link from "next/link";
import { Terminal } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { SubscribeForm } from "@/components/subscribe-form";
import { CookieSettingsButton } from "@/components/cookie-notice";
import { AWESOME_LIST_URL, SITE_GITHUB } from "@/lib/site";

const cols: { title: string; links: [string, string][] }[] = [
  {
    title: "Directory",
    links: [
      ["Claude Skills", "/claude-skills"],
      ["MCP Servers", "/mcp-servers"],
      ["Copilot Agents", "/copilot-agents"],
      ["AI Workflows", "/ai-workflows"],
      ["Cursor Rules", "/cursor-rules"],
      ["Browse all", "/browse"],
      ["Awesome list ↗", AWESOME_LIST_URL],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Learn hub", "/learn"],
      ["What are Claude Skills?", "/learn/what-are-claude-skills"],
      ["Skills vs MCP", "/learn/claude-skills-vs-mcp-servers"],
      ["Blog", "/blog"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Submit an asset", "/submit"],
      ["Advertise", "/advertise"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Cookies", "/cookies"],
      ["Disclosure", "/disclosure"],
      ["License policy", "/license-policy"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          {/* brand + email capture */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-surface text-accent shadow-[0_0_20px_var(--accent-glow)]">
                <Terminal className="h-4 w-4" />
              </span>
              <span className="font-mono text-sm">
                <span className="text-muted">~/</span>
                <span className="text-fg">ai_assets_directory</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The curated, tested directory of open-source AI assets for
              developers. Copy, install, ship.
            </p>

            <SubscribeForm />
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-fg">
                  {c.title}
                </h3>
                <ul className="space-y-2.5">
                  {c.links.map(([label, href]) => {
                    const external = href.startsWith("http");
                    return (
                      <li key={label}>
                        <Link
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer" : undefined}
                          className="text-sm text-muted transition-colors hover:text-fg"
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                  {c.title === "Legal" && (
                    <li>
                      <CookieSettingsButton className="text-sm text-muted transition-colors hover:text-fg" />
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} AI Assets Directory, independent &amp; not
            affiliated with Anthropic, GitHub or OpenAI.
          </p>
          <div className="flex items-center gap-4 text-muted">
            <a
              href={SITE_GITHUB}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-fg"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <span className="font-mono text-xs">built for builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
