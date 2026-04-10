"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { BrandWordmark } from "@/components/BrandWordmark";

type HeroPageLeadProps = {
  className?: string;
};

export function HeroPageLead({ className }: HeroPageLeadProps) {
  // Higher maxOffset so the background keeps moving during the “swallow” runway.
  const parallaxY = useParallax({ maxOffsetPx: 520, strength: 0.16 });

  return (
    <section
      id="page-lead"
      className={cn(
        /*
         * Solugen-like “swallow” effect:
         * the hero is taller than the viewport, but its visual layer is sticky (h-screen).
         * The next section can slide over it while the header stays fixed.
         */
        "relative w-full bg-background text-foreground",
        className,
      )}
    >
      {/* Scroll runway (taller than viewport) */}
      <div className="relative min-h-[300vh] md:min-h-[340vh]">
        {/* Sticky visual layer */}
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Liquid background (EcoTrace x Solugen-like) */}
          <div className="absolute inset-0">
            {/* Base paper */}
            <div className="absolute inset-0 bg-background" />

            {/* Hero background image */}
            <Image
              src="/images/ecotrace-hero-bg.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-95 saturate-[1.12] contrast-[1.06] will-change-transform"
              style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
            />

            {/* Contrast veil (keeps headline readable) */}
            <div className="absolute inset-0 bg-background/40" />

            {/* Animated blobs */}
            <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[rgba(27,191,60,0.22)] blur-3xl mix-blend-multiply motion-safe:animate-[eco-blob-1_22s_ease-in-out_infinite]" />
            <div className="absolute -right-56 top-10 h-[680px] w-[680px] rounded-full bg-[rgba(0,162,230,0.20)] blur-3xl mix-blend-multiply motion-safe:animate-[eco-blob-2_26s_ease-in-out_infinite]" />
            <div className="absolute left-[30%] -bottom-56 h-[620px] w-[620px] rounded-full bg-[rgba(27,191,60,0.18)] blur-3xl mix-blend-multiply motion-safe:animate-[eco-blob-3_28s_ease-in-out_infinite]" />

            {/* Soft vignette to keep text readable */}
            <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(255,255,255,0.0),rgba(243,243,243,0.80))]" />

            {/* Tech grid overlay */}
            <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(17,17,17,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />
          </div>

          <div className="relative flex h-[100svh] w-full items-center justify-center px-4 sm:px-8">
            <div className="flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto">
              <h1 className="mx-auto text-center font-heading text-[34px] font-light leading-[1.08] tracking-[0.01em] text-[#161616] [text-shadow:0_1px_0_rgba(255,255,255,0.48)] sm:text-[58px] sm:leading-[1.08] md:text-[76px]">
                <span className="block whitespace-nowrap">
                  <BrandWordmark className="text-[1em]" />
                  <span>:</span>
                </span>
                <span className="block whitespace-nowrap">
                  <span>Autonomous </span>
                  <span className="font-semibold text-white">Scientific</span>
                  <span> Traceability</span>
                </span>
                <span className="block whitespace-nowrap">for Global Supply Chains</span>
              </h1>
              <p className="mx-auto mt-10 max-w-3xl text-center text-lg font-light leading-relaxed text-gray-600">
                Advancing the UK’s technical infrastructure for Scope 3 visibility. Through{" "}
                <strong className="text-[1.08em] font-semibold text-foreground">Algorithm Ω</strong>
                , we provide an R&amp;D-driven SaaS platform that automates the transition from
                industrial data to verifiable, evidence-based environmental reporting.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="#motores"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-accent-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Explore Engines
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-white/50 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/70 hover:text-foreground hover:shadow-md"
                >
                  Talk to Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

