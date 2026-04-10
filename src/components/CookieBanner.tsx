"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "ecotrace_cookie_consent_v1";

type CookieChoice = "accepted_all" | "essential_only";

export function CookieBanner({ className }: { className?: string }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function saveChoice(choice: CookieChoice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // no-op; keep UX functional even if storage is blocked
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={cn("fixed inset-x-0 bottom-0 z-[210] p-3 sm:p-5", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-5xl rounded-2xl border border-white/15 bg-black/65 px-4 py-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl",
          "sm:px-5",
        )}
        role="dialog"
        aria-live="polite"
        aria-label="Cookie preferences"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-light leading-relaxed text-white/85">
            We use cookies to enhance your experience. See our{" "}
            <Link href="/cookie-policy" className="underline underline-offset-2 hover:text-white">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => saveChoice("essential_only")}
              className="inline-flex h-9 items-center justify-center rounded-full border border-white/30 px-4 text-xs font-medium uppercase tracking-[0.14em] text-white/90 transition-colors hover:border-white/50 hover:text-white"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => saveChoice("accepted_all")}
              className="inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-xs font-medium uppercase tracking-[0.14em] text-accent-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
