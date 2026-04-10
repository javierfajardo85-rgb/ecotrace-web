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
    <footer className={cn("w-full overflow-x-hidden bg-[#010101] text-white", className)}>
      {/* Scroll is confined to this bar (no page-level horizontal overflow). */}
      <div className="w-full overflow-x-auto overscroll-x-contain">
        <div className="mx-auto flex w-fit min-w-max items-center justify-between gap-8 px-6 py-10 sm:px-12">
          <div className="shrink-0 whitespace-nowrap text-xs leading-relaxed text-white/80">
            ©2026 EcoTrace Green Solutions. All rights reserved
          </div>

          <div className="flex shrink-0 items-center gap-8 whitespace-nowrap text-xs text-white/80">
            <Link href="/privacy-policy" className="whitespace-nowrap hover:text-white">
              Privacy Policy
            </Link>
            <div className="whitespace-nowrap">London, Greater London, United Kigdom</div>
          </div>

          <div className="flex shrink-0 flex-nowrap items-center gap-3 pr-6 sm:pr-12">
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
      </div>
    </footer>
  );
}

