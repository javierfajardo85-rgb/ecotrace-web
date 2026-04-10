"use client";

import { useContactModal } from "@/components/contact/ContactModalProvider";
import type { ContactInquiryId } from "@/components/contact/contact-inquiry-types";
import { cn } from "@/lib/utils";

const actions: readonly { label: string; inquiry: ContactInquiryId }[] = [
  { label: "Request Demo", inquiry: "demo" },
  { label: "Contact Sales", inquiry: "sales" },
  { label: "Technical Whitepaper", inquiry: "whitepaper" },
  { label: "Strategic Partnerships", inquiry: "partnerships" },
];

export function AboutCtasRow({ className }: { className?: string }) {
  const { openContactModal } = useContactModal();

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full overflow-x-auto overscroll-x-contain">
        <div className="mx-auto flex w-fit min-w-max flex-nowrap items-center justify-center gap-4 sm:gap-6">
          {actions.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => openContactModal(a.inquiry)}
              className="inline-flex h-9 w-[195px] shrink-0 items-center justify-center rounded-full border border-white/35 px-4 text-center text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-white/90 transition-colors hover:border-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 sm:text-[10px]"
            >
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
