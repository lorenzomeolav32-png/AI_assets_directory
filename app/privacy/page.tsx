import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { pageMeta } from "@/lib/seo";
import { SITE_EMAIL, SITE_OPERATOR, LEGAL_LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How AI Assets Directory collects, uses and protects your data. We collect the minimum needed, never sell it, and honour GDPR and CCPA rights.",
  path: "/privacy",
  eyebrow: "your data",
});

export default function PrivacyPage() {
  return (
    <PageShell
      label="Privacy"
      command="~/legal/privacy"
      title="Privacy Policy"
      lead="We collect the minimum we need to run the site, never sell your data, and honour your privacy rights."
      updated={LEGAL_LAST_UPDATED}
      prose
    >
      <p>
        This policy explains what {SITE_OPERATOR} (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;) collects when you use this website, why, and what
        control you have. Questions? Email{" "}
        <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
      </p>

      <h2>Who we are</h2>
      <p>
        {SITE_OPERATOR} is an independent directory of open-source AI assets. We
        are the controller of the personal data described below. You can contact
        us for any privacy matter at{" "}
        <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>; we can provide our
        postal address on request.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Newsletter email.</strong> If you subscribe, we store the
          email address you enter so we can send new-asset updates. That is the
          only field we ask for.
        </li>
        <li>
          <strong>Messages you send us.</strong> If you email us or open a
          submission, we keep the contents so we can reply and follow up.
        </li>
        <li>
          <strong>Usage analytics (only with consent).</strong> If you accept
          analytics cookies, Google Analytics collects pseudonymous data about
          your visit: pages viewed, approximate location, device and browser,
          referrer, and a random identifier stored in a cookie. IP addresses are
          not logged or stored by Google Analytics 4.
        </li>
        <li>
          <strong>Technical logs.</strong> Our hosting provider automatically
          records standard request data (IP address, browser/user-agent, pages
          requested, timestamps) to keep the site secure and running.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> run user accounts, ask for passwords, or
        collect payment details. We do not knowingly collect special-category
        data.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>We never sell or rent your personal data.</li>
        <li>We do not run advertising cookies or marketing pixels.</li>
        <li>We do not build advertising profiles about you.</li>
        <li>We do not load analytics before you consent.</li>
      </ul>

      <h2>Why we use it (legal bases)</h2>
      <ul>
        <li>
          <strong>Consent</strong>: sending you the newsletter and using Google
          Analytics cookies. You can withdraw consent at any time (newsletter:
          unsubscribe link; analytics: “Cookie settings” in the footer).
        </li>
        <li>
          <strong>Legitimate interests</strong>: keeping the site secure,
          preventing abuse, and replying to messages you send us.
        </li>
      </ul>

      <h2>Service providers</h2>
      <p>
        We keep the stack small. The providers that may process data on our
        behalf are:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong>: hosting, content delivery and our key-value
          store (used to hold newsletter emails). Vercel processes request logs
          as part of serving the site.
        </li>
        <li>
          <strong>Google Ireland Limited / Google LLC</strong>: Google
          Analytics 4, loaded only if you accept analytics cookies. Google acts
          as our processor.
        </li>
      </ul>
      <p>
        These providers act as our processors under a data processing agreement.
        If we add an email-delivery provider for the newsletter, we will list it
        here first.
      </p>

      <h2>International transfers</h2>
      <p>
        Our providers may process data on servers outside your country,
        including in the United States. Where required, such transfers rely on
        appropriate safeguards such as the EU–US Data Privacy Framework or the
        EU Standard Contractual Clauses.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          <strong>Newsletter email</strong>: until you unsubscribe or ask us to
          delete it.
        </li>
        <li>
          <strong>Messages</strong>: for as long as needed to handle your
          request, then archived or deleted.
        </li>
        <li>
          <strong>Analytics data</strong>: up to 14 months, then automatically
          deleted by Google Analytics.
        </li>
        <li>
          <strong>Technical logs</strong>: for a short period for security and
          diagnostics, per our provider&rsquo;s defaults.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct,
        delete, or export your data, to object to or restrict processing, and to
        withdraw consent. If you are in the EU/EEA or UK, these rights come from
        the GDPR. If you are in California, the CCPA/CPRA gives you the right to
        know, delete, correct and opt out of &ldquo;sale&rdquo; or
        &ldquo;sharing&rdquo;. We do neither.
      </p>
      <p>
        To exercise any right, email{" "}
        <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>. To unsubscribe from
        the newsletter, use the link in any email or contact us. EU/EEA users
        may also lodge a complaint with their local supervisory authority.
      </p>

      <h2>Cookies &amp; local storage</h2>
      <p>
        We use essential and functional storage, plus analytics cookies only
        with your consent. The details are in our{" "}
        <Link href="/cookies">Cookie Policy</Link>.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for developers and is not directed at children
        under 16. We do not knowingly collect their data.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy as the site evolves. Material changes will be
        reflected by the &ldquo;last updated&rdquo; date above.
      </p>
    </PageShell>
  );
}
