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
      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => openContactModal(a.inquiry)}
            className="inline-flex h-10 w-full items-center justify-center rounded-full border border-white/35 px-4 text-center text-[10px] font-medium uppercase leading-tight tracking-[0.14em] text-white/90 transition-colors hover:border-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
