"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type ModalOrigin = { x: number; y: number } | null;

export type RailInfrastructureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  origin: ModalOrigin;
};

export function RailInfrastructureModal({
  isOpen,
  onClose,
  origin,
}: RailInfrastructureModalProps) {
  const reduceMotion = useReducedMotion();
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const titleId = React.useId();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileViewport, setIsMobileViewport] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobileViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const transition = reduceMotion
    ? { duration: 0.01 }
    : isMobileViewport
      ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }
      : { type: "spring" as const, damping: 28, stiffness: 320, mass: 0.85 };

  const overlayTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  const viewportCenterX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const viewportCenterY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
  const initialX = origin ? origin.x - viewportCenterX : 0;
  const initialY = origin ? origin.y - viewportCenterY : 8;

  const node = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="rail-infrastructure-modal-root"
          className="fixed inset-0 z-[220] flex items-center justify-center p-4 sm:p-6"
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
              "relative z-10 w-full max-w-[min(100%,980px)] overflow-hidden rounded-[2.25rem] border border-white/20",
              "bg-white/82 shadow-[0_24px_80px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.10)_inset]",
              "backdrop-blur-xl supports-[backdrop-filter]:bg-white/78",
            )}
            initial={
              reduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9, x: initialX, y: initialY }
            }
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 6 }}
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

            <div className="max-h-[min(90vh,820px)] overflow-y-auto p-6 sm:p-8 md:p-10">
              <h3
                id={titleId}
                className="font-heading text-2xl leading-tight tracking-[-0.02em] text-foreground sm:text-3xl"
              >
                Kinetic Energy Recovery &amp; Electrified Network Analytics
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-foreground/75 sm:text-base">
                The Omega (Ω) Engine provides a specialized framework for the rigid physical
                constraints of rail logistics, ensuring sub-1% accuracy in mass-transit energy
                validation:
              </p>

              <div className="mt-6 grid gap-4 sm:gap-5">
                <section className="rounded-2xl border border-foreground/10 bg-white/48 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-5">
                  <h4 className="text-sm font-semibold tracking-[-0.01em] text-foreground/90 sm:text-base">
                    Electric Traction (Catenary-Based)
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    Managing the validation of high-voltage power draw. Our architecture isolates
                    the energy used for traction from auxiliary systems, ensuring a precise audit of
                    the kinetic energy required for heavy-haul freight.
                  </p>
                </section>

                <section className="rounded-2xl border border-foreground/10 bg-white/48 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-5">
                  <h4 className="text-sm font-semibold tracking-[-0.01em] text-foreground/90 sm:text-base">
                    Diesel-Electric Vector
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    Resolving the non-linear efficiency curves of massive industrial locomotives.
                    The PINN-based engine cross-references fuel flow with track gradient and
                    trailing tonnage to verify real-world energy demand.
                  </p>
                </section>

                <section className="rounded-2xl border border-foreground/10 bg-white/48 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-5">
                  <h4 className="text-sm font-semibold tracking-[-0.01em] text-foreground/90 sm:text-base">
                    Regenerative Rail Braking
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    Validating the energy fed back into the network or stored in on-board capacitors
                    during deceleration - a critical uncertainty in modern rail decarbonization
                    R&amp;D.
                  </p>
                </section>
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
