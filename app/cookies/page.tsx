import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { pageMeta } from "@/lib/seo";
import { CookieSettingsButton } from "@/components/cookie-notice";
import { SITE_EMAIL, LEGAL_LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Cookie Policy",
  description:
    "AI Assets Directory uses essential storage and, only with your consent, Google Analytics cookies. No advertising cookies. Here is exactly what we store and why.",
  path: "/cookies",
  eyebrow: "cookies & storage",
});

export default function CookiesPage() {
  return (
    <PageShell
      label="Cookies"
      command="~/legal/cookies"
      title="Cookie Policy"
      lead="Essential storage always. Google Analytics cookies only if you accept. No advertising cookies."
      updated={LEGAL_LAST_UPDATED}
      prose
    >
      <p>
        This page explains the cookies and browser storage this website uses.
        Cookies are small files a site can store in your browser; some sites also
        use <em>local storage</em>, which keeps small values on your device
        without ever sending them to the server.
      </p>

      <h2>The short version</h2>
      <p>
        We do <strong>not</strong> use advertising cookies and there are no
        marketing pixels on this site. We use Google Analytics to measure
        audience and usage, but <strong>only if you click Accept</strong> in the
        cookie banner. Until then, no analytics script is loaded and no
        analytics cookie is set. You can change your choice at any time.
      </p>
      <p>
        <CookieSettingsButton className="text-accent hover:underline" />
      </p>

      <h2>What we actually store</h2>
      <ul>
        <li>
          <strong>Theme preference (functional).</strong> When you switch between
          dark and light mode, we remember your choice in your browser&rsquo;s
          local storage so the site looks right on your next visit. It stays on
          your device.
        </li>
        <li>
          <strong>Cookie choice (functional).</strong> We store your Accept or
          Reject decision in local storage so we do not ask again. It stays on
          your device.
        </li>
        <li>
          <strong>Essential hosting.</strong> Our host (Vercel) may set minimal,
          strictly necessary cookies for security and to serve the site
          correctly. These are not used to track you across sites.
        </li>
      </ul>

      <h2>Analytics cookies (only with your consent)</h2>
      <p>
        If you accept, we load Google Analytics 4, provided by Google Ireland
        Limited, to count visits and understand which pages are useful. It sets
        these first-party cookies:
      </p>
      <ul>
        <li>
          <strong>_ga</strong>: distinguishes visitors. Expires after 2 years.
        </li>
        <li>
          <strong>_ga_&lt;ID&gt;</strong>: keeps session state. Expires after 2
          years.
        </li>
      </ul>
      <p>
        We do not use Google Signals, advertising features or remarketing, and
        we do not combine this data with other sources. If you reject or later
        withdraw consent, the script is not loaded and these cookies are
        deleted.
      </p>

      <h2>What we do not use</h2>
      <ul>
        <li>Advertising or retargeting cookies.</li>
        <li>Cross-site or social-media tracking pixels.</li>
        <li>Any analytics before you give consent.</li>
      </ul>

      <h2>Managing storage yourself</h2>
      <p>
        You can clear or block cookies and local storage at any time from your
        browser settings. Clearing them simply resets your theme choice and your
        cookie choice, so the banner will appear again. It will not break the
        site.
      </p>

      <p>
        See also our <Link href="/privacy">Privacy Policy</Link>. Questions?
        Email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
      </p>
    </PageShell>
  );
}
