"use client";

import { useContactModal } from "@/components/contact/ContactModalProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";

const social = [
  { label: "in", href: "#" },
  { label: "X", href: "#" },
  { label: "IG", href: "#" },
] as const;

export function BlackFooterBar({ className }: { className?: string }) {
  const { openContactModal } = useContactModal();

  return (
    <footer className={cn("w-full bg-[#010101] text-white", className)}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-10 text-center sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="text-xs leading-relaxed text-white/80">
            ©2026 EcoTrace Green Solutions. All rights reserved
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/80 lg:justify-start">
            <Link href="/privacy-policy" className="whitespace-nowrap hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="whitespace-nowrap hover:text-white">
              Cookie Policy
            </Link>
            <div className="whitespace-nowrap">London, Greater London, United Kigdom</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-xs font-medium text-white/90 transition-colors hover:border-white/45 hover:text-white"
              aria-label={s.label}
            >
              {s.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => openContactModal("general")}
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/25 px-6 text-xs font-medium text-white/90 transition-colors hover:border-white/45 hover:text-white"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}

