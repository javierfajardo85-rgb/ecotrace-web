"use client";

import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/** Scroll progress span used after each dot threshold (keeps line–dot sync; only the slide is eased). */
const SLIDE_SCROLL_SPAN = 0.09;

function easeOutCubic(t: number): number {
  const u = Math.min(1, Math.max(0, t));
  return 1 - (1 - u) ** 3;
}

function easeOutQuart(t: number): number {
  const u = Math.min(1, Math.max(0, t));
  return 1 - (1 - u) ** 4;
}

/** Opacity + X driven by scroll with soft ease-out (no linear “mechanical” slide). */
function slideMotion(
  v: number,
  threshold: number,
  xFrom: number,
): { opacity: number; x: number } {
  const end = Math.min(1, threshold + SLIDE_SCROLL_SPAN);
  if (v <= threshold) {
    return { opacity: 0, x: xFrom };
  }
  if (v >= end) {
    return { opacity: 1, x: 0 };
  }
  const span = end - threshold;
  const t = (v - threshold) / span;
  const opacity = easeOutCubic(Math.min(1, t / 0.38));
  const xEase = easeOutQuart(t);
  return { opacity, x: xFrom * (1 - xEase) };
}

type Milestone = {
  quarter: string;
  title: string;
  description: string;
};

// 5 milestones (quarters only, no years).
const milestones: Milestone[] = [
  {
    quarter: "Q1",
    title: "Foundational Infrastructure",
    description:
      "Establishment of our proprietary HPC environment and deployment of the Omega (Ω) Data-Vault. This phase secures our deterministic physics baseline and sovereign data architecture.",
  },
  {
    quarter: "Q2",
    title: "Neural Core Training",
    description:
      "Large-scale execution of 1M synthetic route simulations. Intensive training of the PINN Engine to resolve high-dimensional physics and achieve our sub-1% accuracy target.",
  },
  {
    quarter: "Q3",
    title: "Enterprise Integration",
    description:
      "Engineering of proprietary R&D data bridges for global ERP ecosystems. Initiation of alpha-stage technical collaborations to validate the Omega (Ω) Engine in industrial environments.",
  },
  {
    quarter: "Q4",
    title: "Scientific Validation",
    description:
      "Industrial stress-testing of the SCVE infrastructure using high-density datasets. Final engineering alignment with ISO 14083 to ensure global carbon reporting standards.",
  },
  {
    quarter: "Q5",
    title: "Multi-Modal Expansion",
    description:
      "Expanding the PINN architectures beyond road transport. Initial R&D and simulation for Maritime and Rail sectors, bringing high-precision validation to the entire supply chain.",
  },
];

function MilestoneContent({ milestone }: { milestone: Milestone }) {
  return (
    <div className="mx-auto max-w-[88%] text-left md:mx-0 md:max-w-xs">
      <div className="text-[19px] font-light tracking-tight text-foreground/95 md:text-2xl">
        {milestone.title}
      </div>
      <div className="mt-2.5 whitespace-pre-line text-xs leading-relaxed text-gray-500 md:mt-3 md:text-sm">
        {milestone.description}
      </div>
    </div>
  );
}

function computeThresholds(
  trackEl: HTMLElement,
  dotEls: (HTMLElement | null)[],
): number[] {
  const trackRect = trackEl.getBoundingClientRect();
  const trackH = trackRect.height;
  if (trackH <= 0) {
    return milestones.map((_, i) =>
      milestones.length <= 1 ? 1 : (i / (milestones.length - 1)) * 0.92,
    );
  }
  return dotEls.map((dot) => {
    if (!dot) {
      return 0;
    }
    const r = dot.getBoundingClientRect();
    const centerY = r.top + r.height / 2 - trackRect.top;
    return Math.max(0, Math.min(1, centerY / trackH));
  });
}

type RoadmapMilestoneRowProps = {
  milestone: Milestone;
  side: "left" | "right";
  scrollYProgress: MotionValue<number>;
  threshold: number;
  dotRef: React.RefCallback<HTMLDivElement | null>;
  isMdUp: boolean;
};

function RoadmapMilestoneRow({
  milestone,
  side,
  scrollYProgress,
  threshold,
  dotRef,
  isMdUp,
}: RoadmapMilestoneRowProps) {
  const isLeftSide = side === "left";
  // Mobile: slide from the timeline toward the right. Desktop keeps alternating directions.
  const xFrom = isMdUp ? (isLeftSide ? 144 : -144) : -42;

  const textOpacity = useTransform(scrollYProgress, (v) =>
    slideMotion(v, threshold, xFrom).opacity,
  );
  const textX = useTransform(scrollYProgress, (v) => slideMotion(v, threshold, xFrom).x);

  const dotScale = useTransform(scrollYProgress, (v) => (v >= threshold ? 1.35 : 1));

  return (
    <div
      className={cn(
        "relative",
        "min-h-[36vh] py-6 sm:min-h-[40vh] md:min-h-[33vh] md:py-0",
        "pl-14 pr-4",
        "md:grid md:pl-0 md:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] md:items-center",
      )}
    >
      <motion.div
        ref={dotRef}
        className="pointer-events-none absolute left-5 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6] shadow-[0_0_0_6px_rgba(59,130,246,0.12)] md:left-1/2 md:shadow-[0_0_0_8px_rgba(59,130,246,0.10)]"
        style={{ scale: dotScale }}
        transition={{ type: "spring", stiffness: 380, damping: 18, mass: 0.5 }}
      />

      <div
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2",
          "left-5 -translate-x-[calc(100%+10px)] text-right",
          "md:left-1/2 md:translate-x-0",
          side === "left"
            ? "md:-translate-x-[calc(100%+14px)]"
            : "md:translate-x-[14px]",
        )}
      >
        <motion.div
          className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground md:text-[11px]"
          style={{ opacity: textOpacity, x: textX }}
      >
        {milestone.quarter}
      </motion.div>
    </div>

      <motion.div
        className={cn(
          "md:col-start-1",
          side === "left"
            ? "md:col-start-1 md:justify-self-end md:pr-20"
            : "md:col-start-3 md:justify-self-start md:pl-20",
        )}
        style={{ opacity: textOpacity, x: textX }}
      >
        <MilestoneContent milestone={milestone} />
      </motion.div>
    </div>
  );
}

export function GrowthRoadmapSection({ className }: { className?: string }) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const timelineRef = React.useRef<HTMLDivElement | null>(null);
  const dotRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [thresholds, setThresholds] = React.useState<number[]>(() =>
    milestones.map((_, i) =>
      milestones.length <= 1 ? 1 : (i / (milestones.length - 1)) * 0.92,
    ),
  );
  const [isMdUp, setIsMdUp] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const measure = React.useCallback(() => {
    const track = timelineRef.current;
    if (!track) return;
    const next = computeThresholds(track, dotRefs.current);
    setThresholds((prev) => {
      if (
        prev.length === next.length &&
        prev.every((p, i) => Math.abs(p - next[i]) < 0.002)
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  React.useLayoutEffect(() => {
    measure();
    const track = timelineRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(track);
    return () => ro.disconnect();
  }, [measure]);

  React.useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    // Sync line tip with dots when they cross 5/8 viewport height.
    offset: ["start 0.625", "end 0.625"],
  });

  const fillScaleY = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)));

  const dotRefCallbacks = React.useMemo(
    () =>
      milestones.map(
        (_, i) => (el: HTMLDivElement | null) => {
          dotRefs.current[i] = el;
          if (el) {
            requestAnimationFrame(measure);
          }
        },
      ),
    [measure],
  );

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className={cn("overflow-x-hidden bg-background text-foreground", className)}
      aria-label="The Omega (Ω) Journey"
    >
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            The Omega (Ω) Journey
          </p>
        </div>

        <div ref={timelineRef} className="relative mt-24 md:mt-32">
          <div className="pointer-events-none absolute bottom-0 left-5 top-0 md:left-1/2 md:-translate-x-1/2">
            <div className="relative h-full w-px bg-foreground/15" />
            <motion.div
              className="absolute left-0 top-0 h-full w-px origin-top bg-[#3b82f6] shadow-[0_0_18px_rgba(59,130,246,0.55)]"
              style={{ scaleY: fillScaleY }}
            />
          </div>

          <div className="space-y-0">
            {milestones.map((m, i) => {
              const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
              const threshold =
                thresholds[i] ?? i / Math.max(1, milestones.length - 1);
              return (
                <RoadmapMilestoneRow
                  key={`${m.quarter}-${m.title}`}
                  milestone={m}
                  side={side}
                  scrollYProgress={scrollYProgress}
                  threshold={threshold}
                  dotRef={dotRefCallbacks[i]!}
                  isMdUp={isMdUp}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
