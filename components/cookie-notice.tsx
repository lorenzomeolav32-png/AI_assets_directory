"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

const KEY = "aad-cookie-consent";
const OPEN_EVENT = "aad:open-cookie-settings";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_ENABLED = process.env.NODE_ENV === "production" && !!GA_ID;

type Choice = "granted" | "denied";
type Snapshot = Choice | "none" | "unknown";

const listeners = new Set<() => void>();
let memoryChoice: Choice | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Snapshot {
  if (memoryChoice) return memoryChoice;
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "none";
  } catch {
    return "none";
  }
}

const getServerSnapshot = (): Snapshot => "unknown";

function saveChoice(next: Choice) {
  memoryChoice = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* private mode: keep the choice in memory for this session */
  }
  listeners.forEach((l) => l());
}

function clearGaCookies() {
  const labels = location.hostname.split(".");
  const domains = [location.hostname];
  for (let i = 0; i < labels.length - 1; i++) {
    domains.push("." + labels.slice(i).join("."));
  }
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach((name) => {
      const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = expired;
      domains.forEach((d) => (document.cookie = `${expired}; domain=${d}`));
    });
}

/** Consent banner. Google Analytics is mounted only after an explicit "Accept";
 *  nothing non-essential loads or is stored before that. The choice is kept in
 *  localStorage and can be changed anytime via "Cookie settings" (footer). */
export function CookieNotice() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);
  const open = choice !== "unknown" && (choice === "none" || reopened);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function decide(next: Choice) {
    const wasGranted = choice === "granted";
    saveChoice(next);
    setReopened(false);
    if (next === "denied" && wasGranted) {
      // The GA script is already running in this page; drop its cookies and reload without it.
      clearGaCookies();
      location.reload();
    }
  }

  return (
    <>
      {GA_ENABLED && choice === "granted" && (
        <GoogleAnalytics gaId={GA_ID!} />
      )}
      {open && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-xl border border-line bg-bg-2/95 p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm leading-relaxed text-muted">
              <span className="mr-2 font-mono text-xs text-accent">$</span>
              We use essential storage to run the site and, only if you agree,
              Google Analytics cookies to understand how it is used. No
              advertising cookies. See our{" "}
              <Link href="/cookies" className="text-accent hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => decide("denied")}
                className="rounded-md border border-accent px-4 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
              >
                Reject
              </button>
              <button
                onClick={() => decide("granted")}
                className="rounded-md border border-accent bg-accent px-4 py-1.5 text-xs font-medium text-accent-ink transition-transform hover:scale-[1.03]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
