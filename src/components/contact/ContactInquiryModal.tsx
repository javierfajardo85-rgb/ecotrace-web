"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BrandWordmark } from "@/components/BrandWordmark";
import { cn } from "@/lib/utils";
import {
  CONTACT_INQUIRY_OPTIONS,
  type ContactInquiryId,
} from "@/components/contact/contact-inquiry-types";

export type ContactInquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultInquiryId: ContactInquiryId;
};

const inputClass =
  "w-full rounded-2xl border border-foreground/12 bg-white/45 px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition-[border-color,box-shadow] placeholder:text-foreground/35 focus:border-foreground/25 focus:ring-2 focus:ring-[#3b82f6]/25";
const inputClassCompact =
  "w-full rounded-2xl border border-foreground/12 bg-white/45 px-4 py-2.5 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition-[border-color,box-shadow] placeholder:text-foreground/35 focus:border-foreground/25 focus:ring-2 focus:ring-[#3b82f6]/25";

type GlassSelectOption = {
  value: string;
  label: string;
};

function GlassSelect({
  id,
  label,
  required,
  placeholder,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  value: string | null;
  onChange: (next: string) => void;
  options: readonly GlassSelectOption[];
  error?: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const t = e.target as Node | null;
      if (!t) return;
      if (buttonRef.current?.contains(t)) return;
      if (listRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const selected = value ? options.find((o) => o.value === value) : null;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-foreground/70"
      >
        {label}{" "}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-2xl border border-foreground/12 bg-white/45 px-4 py-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition-[border-color,box-shadow,background-color] focus:border-foreground/25 focus:ring-2 focus:ring-[#3b82f6]/25",
          error ? "border-red-500/40 focus:ring-red-500/20" : null,
          selected ? "text-black" : "text-gray-400",
        )}
      >
        <span className="truncate">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-foreground/45 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={listRef}
            role="listbox"
            aria-labelledby={id}
            className={cn(
              "absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-white/20",
              "bg-white/78 shadow-[0_18px_55px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.10)_inset]",
              "backdrop-blur-xl",
            )}
            initial={{ opacity: 0, y: -6, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(10px)" }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-h-56 overflow-auto p-1">
              {options.map((opt) => {
                const active = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                      active
                        ? "bg-foreground/6 text-foreground"
                        : "text-foreground/85 hover:bg-foreground/5",
                    )}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                      buttonRef.current?.focus();
                    }}
                  >
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {error ? (
        <p className="mt-1 text-[11px] font-medium text-red-600/90">{error}</p>
      ) : null}
    </div>
  );
}

export function ContactInquiryModal({
  isOpen,
  onClose,
  defaultInquiryId,
}: ContactInquiryModalProps) {
  const reduceMotion = useReducedMotion();
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const titleId = React.useId();
  const [mounted, setMounted] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<ContactInquiryId>(
    defaultInquiryId,
  );
  const [productVertical, setProductVertical] = React.useState<string | null>(
    null,
  );
  const [industrySector, setIndustrySector] = React.useState<string | null>(
    null,
  );
  const [selectorErrors, setSelectorErrors] = React.useState<{
    productVertical?: string;
    industrySector?: string;
  }>({});
  const [submitState, setSubmitState] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [submitFeedback, setSubmitFeedback] = React.useState<string>("");

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedId(defaultInquiryId);
      setProductVertical(null);
      setIndustrySector(null);
      setSelectorErrors({});
      setSubmitState("idle");
      setSubmitFeedback("");
    }
  }, [isOpen, defaultInquiryId]);

  React.useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (!isOpen) return;
    const root = dialogRef.current;
    if (!root) return;

    const focusables = root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const list = Array.from(focusables);
    if (list.length === 0) return;

    const first = list[0];
    const last = list[list.length - 1];
    window.requestAnimationFrame(() => first.focus());

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || list.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedId === "demo") {
      const nextErrors: typeof selectorErrors = {};
      if (!productVertical) nextErrors.productVertical = "Required";
      if (!industrySector) nextErrors.industrySector = "Required";
      if (Object.keys(nextErrors).length > 0) {
        setSelectorErrors(nextErrors);
        return;
      }
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmitState("submitting");
    setSubmitFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Unable to send message.");
      }
      setSubmitState("success");
      setSubmitFeedback("Message sent successfully. We will get back to you shortly.");
      form.reset();
      setProductVertical(null);
      setIndustrySector(null);
      setSelectorErrors({});
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send message. Please try again.";
      setSubmitState("error");
      setSubmitFeedback(message);
    }
  }

  const needsPartnerExtras = selectedId === "partnerships";
  const needsDemoExtras = selectedId === "demo";
  const isWhitepaper = selectedId === "whitepaper";
  const showSelectors = !isWhitepaper;
  const selectorsRequired = needsDemoExtras;
  const compactQuestionnaire = needsPartnerExtras || needsDemoExtras;
  const compactTight = needsPartnerExtras; // partnerships still needs a bit more tightening to avoid scroll
  const activeInputClass = compactQuestionnaire ? inputClassCompact : inputClass;

  const productVerticalOptions: readonly GlassSelectOption[] = [
    { value: "fuels", label: "Fuels & Hydrocarbons" },
    { value: "power", label: "Power & Energy" },
    { value: "water", label: "Water Resources" },
    { value: "waste", label: "Waste & Circular Flows" },
    { value: "digital", label: "Digital & Carbon Assets" },
    { value: "materials", label: "Industrial Materials" },
  ];

  const industrySectorOptions: readonly GlassSelectOption[] = [
    { value: "logistics", label: "Logistics & Mobility" },
    { value: "manufacturing", label: "Advanced Manufacturing" },
    { value: "agrifood", label: "Agri-Food Systems" },
    { value: "construction", label: "Infrastructure & Construction" },
    { value: "cloud", label: "Cloud & Digital Infra" },
    { value: "recovery", label: "Resource Recovery" },
  ];

  const transition = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, damping: 28, stiffness: 320, mass: 0.85 };

  const overlayTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  const node = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="contact-inquiry-modal-root"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
        >
          <div
            className="absolute inset-0 cursor-default bg-black/28 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "relative z-10 w-full max-w-[min(100%,920px)] overflow-hidden rounded-[2.25rem] border border-white/20",
              "bg-white/82 shadow-[0_24px_80px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.10)_inset]",
              "backdrop-blur-xl supports-[backdrop-filter]:bg-white/78",
            )}
            initial={
              reduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: 6 }
            }
            transition={transition}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-white/50 text-foreground/70 shadow-sm backdrop-blur transition-colors hover:border-foreground/20 hover:bg-white/80 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>

            <div className="grid max-h-[min(90vh,820px)] grid-cols-1 gap-0 overflow-y-auto lg:grid-cols-5">
              <aside className="flex flex-col border-b border-foreground/10 p-6 sm:p-8 lg:col-span-2 lg:border-b-0 lg:border-r lg:border-foreground/10">
                <p
                  id={titleId}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80"
                >
                  Select your Inquiry
                </p>
                <nav
                  className="mt-8 flex flex-col gap-1"
                  aria-label="Inquiry type"
                >
                  {CONTACT_INQUIRY_OPTIONS.map((opt) => {
                    const active = selectedId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedId(opt.id)}
                        className={cn(
                          "rounded-xl px-3 py-3 text-left text-lg font-light tracking-tight transition-colors duration-200",
                          active
                            ? "text-black"
                            : "text-gray-400 hover:text-black/80",
                        )}
                        aria-current={active ? "true" : undefined}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="relative mt-8 hidden flex-1 overflow-hidden rounded-2xl border border-white/30 shadow-inner lg:block">
                  <Image
                    src="/images/ecotrace-hero-bg.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                    <div className="flex flex-col items-center">
                      <BrandWordmark className="text-3xl text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]" />
                      <span className="mt-0.5 text-[6px] font-medium uppercase tracking-[0.22em] text-white/88">
                        GREEN SOLUTIONS
                      </span>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="p-6 sm:p-8 lg:col-span-3">
                <form
                  className={cn(
                    "flex flex-col",
                    compactTight ? "gap-3" : compactQuestionnaire ? "gap-4" : "gap-5",
                  )}
                  onSubmit={handleSubmit}
                >
                  <div className={cn(compactTight ? "space-y-1.5" : "space-y-3")}>
                    <h3
                      className={cn(
                        "font-light tracking-tight text-foreground/90",
                        compactQuestionnaire ? "text-lg sm:text-xl" : "text-xl sm:text-2xl",
                      )}
                    >
                      {isWhitepaper
                        ? "Download Technical Specifications"
                        : "Get in Touch"}
                    </h3>
                    {isWhitepaper ? (
                      <p className="overflow-x-auto whitespace-nowrap text-sm text-foreground/65">
                        Architectural Overview | Regulatory Framework | Scalability Protocol
                      </p>
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "grid",
                      compactTight ? "gap-3" : compactQuestionnaire ? "gap-4" : "gap-5",
                    )}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-first-name"
                          className="mb-1.5 block text-xs font-medium text-foreground/70"
                        >
                          First Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="contact-first-name"
                          name="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          className={activeInputClass}
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-last-name"
                          className="mb-1.5 block text-xs font-medium text-foreground/70"
                        >
                          Last Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="contact-last-name"
                          name="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          className={activeInputClass}
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    {showSelectors ? (
                      <div
                        className={cn(
                          "grid sm:grid-cols-2",
                          compactTight ? "gap-3" : compactQuestionnaire ? "gap-4" : "gap-5",
                        )}
                      >
                        <GlassSelect
                          id="contact-product-vertical"
                          label="Product Vertical"
                          required={selectorsRequired}
                          placeholder="Select a product vertical"
                          value={productVertical}
                          onChange={(v) => {
                            setProductVertical(v);
                            setSelectorErrors((prev) => ({ ...prev, productVertical: undefined }));
                          }}
                          options={productVerticalOptions}
                          error={selectorsRequired ? selectorErrors.productVertical ?? null : null}
                        />
                        <GlassSelect
                          id="contact-industry-sector"
                          label="Industry Sector"
                          required={selectorsRequired}
                          placeholder="Select an industry sector"
                          value={industrySector}
                          onChange={(v) => {
                            setIndustrySector(v);
                            setSelectorErrors((prev) => ({ ...prev, industrySector: undefined }));
                          }}
                          options={industrySectorOptions}
                          error={selectorsRequired ? selectorErrors.industrySector ?? null : null}
                        />
                      </div>
                    ) : null}

                    {(needsPartnerExtras || needsDemoExtras || isWhitepaper) ? (
                      <div
                        className={cn(
                          "grid sm:grid-cols-2",
                          compactTight ? "gap-3" : compactQuestionnaire ? "gap-4" : "gap-5",
                        )}
                      >
                        <div>
                          <label
                            htmlFor="contact-job-title"
                            className="mb-1.5 block text-xs font-medium text-foreground/70"
                          >
                            Job Title <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="contact-job-title"
                            name="jobTitle"
                            type="text"
                            required
                            autoComplete="organization-title"
                            className={activeInputClass}
                            placeholder="Job title"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-company"
                            className="mb-1.5 block text-xs font-medium text-foreground/70"
                          >
                            {needsDemoExtras ? (
                              <>
                                Company / Affiliation <span className="text-red-600">*</span>
                              </>
                            ) : (
                              <>
                                Company <span className="text-red-600">*</span>
                              </>
                            )}
                          </label>
                          <input
                            id="contact-company"
                            name="company"
                            type="text"
                            required
                            autoComplete="organization"
                            className={activeInputClass}
                            placeholder={needsDemoExtras ? "Company / affiliation" : "Company"}
                          />
                        </div>
                      </div>
                    ) : null}

                    {needsPartnerExtras ? (
                      <div>
                        <label
                          htmlFor="contact-product-interest"
                          className="mb-1.5 block text-xs font-medium text-foreground/70"
                        >
                          Product of Interest <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="contact-product-interest"
                          name="productOfInterest"
                          type="text"
                          required
                          className={activeInputClass}
                          placeholder="Product of interest"
                        />
                      </div>
                    ) : null}

                    {needsDemoExtras ? null : null}

                    {isWhitepaper ? (
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-1.5 block text-xs font-medium text-foreground/70"
                        >
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className={activeInputClass}
                          placeholder="Email"
                        />
                      </div>
                    ) : (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="mb-1.5 block text-xs font-medium text-foreground/70"
                          >
                            Phone <span className="text-foreground/40">(Optional)</span>
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            className={activeInputClass}
                            placeholder="Phone number"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="mb-1.5 block text-xs font-medium text-foreground/70"
                          >
                            Email <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className={activeInputClass}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-xs font-medium text-foreground/70"
                      >
                        Additional Information{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={compactTight ? 3 : compactQuestionnaire ? 4 : 5}
                        className={cn(
                          activeInputClass,
                          compactTight
                            ? "min-h-[92px] resize-y"
                            : compactQuestionnaire
                              ? "min-h-[110px] resize-y"
                              : "min-h-[140px] resize-y",
                        )}
                        placeholder={
                          needsPartnerExtras
                            ? "How are you looking to partner with us?"
                            : "Tell us how we can help"
                        }
                      />
                    </div>
                  </div>

                  <input type="hidden" name="inquiry" value={selectedId} />
                  {showSelectors ? (
                    <>
                      <input
                        type="hidden"
                        name="productVertical"
                        value={productVertical ?? ""}
                      />
                      <input
                        type="hidden"
                        name="industrySector"
                        value={industrySector ?? ""}
                      />
                    </>
                  ) : null}

                  <div className="flex justify-center pt-1">
                    <button
                      type="submit"
                      disabled={submitState === "submitting"}
                      className={cn(
                        "group relative mx-auto inline-flex w-full max-w-xs items-center justify-center rounded-full p-[1.25px]",
                        isWhitepaper
                          ? "bg-gradient-to-r from-[#2563eb] via-sky-400 to-[#22c55e]"
                          : "bg-gradient-to-r from-[#3b82f6] via-sky-400 to-[oklch(0.71_0.2_145)]",
                        isWhitepaper
                          ? "shadow-[0_12px_40px_rgba(37,99,235,0.35)]"
                          : "shadow-[0_8px_32px_rgba(59,130,246,0.22)]",
                        "transition-shadow duration-300",
                        isWhitepaper
                          ? "hover:shadow-[0_18px_54px_rgba(37,99,235,0.52)]"
                          : "hover:shadow-[0_12px_40px_rgba(59,130,246,0.38)]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 disabled:cursor-not-allowed disabled:opacity-70",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-11 w-full items-center justify-center rounded-full bg-white/92 px-8 text-sm font-semibold text-foreground backdrop-blur-sm",
                          "transition-colors group-hover:bg-white",
                        )}
                      >
                        {submitState === "submitting"
                          ? "Enviando..."
                          : isWhitepaper
                            ? "Access Whitepaper"
                            : "Submit"}
                      </span>
                    </button>
                  </div>
                  {submitFeedback ? (
                    <p
                      className={cn(
                        "text-center text-xs",
                        submitState === "success" ? "text-emerald-600/90" : "text-red-600/90",
                      )}
                    >
                      {submitFeedback}
                    </p>
                  ) : null}
                  <p className="text-center text-[11px] font-light text-foreground/55">
                    By submitting, you agree to our{" "}
                    <Link
                      href="/privacy-policy"
                      className="underline underline-offset-2 hover:text-foreground/80"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(node, document.body);
}
