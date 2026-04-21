import { cn } from "@/lib/utils";
import Image from "next/image";

const veracityScore = 98;
const carbonIntensity = 12;

function clampPct(v: number) {
  return Math.max(0, Math.min(100, v));
}

function carbonGradientFor(v: number) {
  const pct = clampPct(v);
  if (pct <= 30) {
    return "linear-gradient(90deg, rgba(34,197,94,0.35), rgba(34,197,94,0.95))";
  }
  if (pct <= 60) {
    return "linear-gradient(90deg, rgba(34,197,94,0.55), rgba(245,158,11,0.95))";
  }
  return "linear-gradient(90deg, rgba(245,158,11,0.65), rgba(239,68,68,0.95))";
}

const carbonZones = [
  { pct: 12.5, label: "Highly Efficient" },
  { pct: 37.5, label: "Standard" },
  { pct: 62.5, label: "Inefficient" },
  { pct: 87.5, label: "Critical" },
] as const;

type Node = {
  label: string;
  kind: "circle" | "square";
  variant?: "normal" | "classified" | "terminal";
  stepNumber: number;
  detail?: string;
};

const nodes: Node[] = [
  { stepNumber: 1, label: "Absolute Consumption\nExtraction", kind: "circle" },
  { stepNumber: 2, label: "Dynamic Emission\nFactor Mapping", kind: "square" },
  { stepNumber: 3, label: "Veracity Coefficient\nAnalysis", kind: "circle" },
  {
    stepNumber: 4,
    label: "…",
    detail: "Proprietary Data Node",
    kind: "circle",
    variant: "classified",
  },
  {
    stepNumber: 5,
    label: "…",
    detail: "Proprietary Data Node",
    kind: "circle",
    variant: "classified",
  },
  {
    stepNumber: 6,
    label: "Proprietary\nValidation Node",
    kind: "circle",
    variant: "terminal",
  },
];

export function TechnologySection({ className }: { className?: string }) {
  return (
    <section id="tecnologia" className={cn("bg-background text-foreground", className)}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Technology
          </p>
          <h2 className="mt-3 font-heading text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
            The Omega (Ω) Engine
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Our architecture bridges the gap between raw industrial telemetry and deterministic
            carbon intelligence. By integrating Physics-Informed Neural Networks (PINNs), the
            Omega (Ω) Engine validates energy consumption through the fundamental laws of
            thermodynamics, purging statistical noise and ensuring data integrity. Through our
            proprietary validation nodes, we deliver a high-precision technical framework that
            enables global logistics to operate with the backing of auditable, physics-based
            evidence at all times.
          </p>
        </div>

        {/* Top indicators */}
        <div className="mt-24 max-w-[520px]">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-[12px] font-medium tracking-[-0.01em] text-foreground/80">
                {veracityScore}% Veracity Score
              </div>
              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-foreground/10 shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <div
                  className="relative h-full rounded-full shadow-[0_14px_40px_rgba(59,130,246,0.35)]"
                  style={{
                    width: `${clampPct(veracityScore)}%`,
                    backgroundImage:
                      "linear-gradient(90deg, rgba(148,163,184,0.28), rgba(59,130,246,0.95))",
                  }}
                >
                  {/* subtle gloss */}
                  <div className="pointer-events-none absolute inset-0 opacity-80 [background:linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0.00))]" />
                  {/* inner edge highlight */}
                  <div className="pointer-events-none absolute inset-0 opacity-70 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.22)]" />
                </div>
                {/* track top sheen */}
                <div className="pointer-events-none absolute inset-0 opacity-50 [background:linear-gradient(to_bottom,rgba(255,255,255,0.16),transparent)]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-2 text-[12px] font-medium tracking-[-0.01em] text-foreground/70">
                <span>Carbon intensity:</span>
                <span>Grade A</span>
                <span className="text-foreground/40">|</span>
                <span className="font-mono text-[11px] tracking-[-0.01em] text-foreground/60">
                  PI ≤ 0.75
                </span>
              </div>
              <div className="relative">
                {/* Marker region: lines extend equally above and below the bar */}
                <div className="relative w-full pt-1.5 pb-1.5">
                  {/* Rating markers (thin, symmetric around the bar) */}
                  {carbonZones.map((z) => (
                    <div
                      key={z.label}
                      className="pointer-events-none absolute inset-y-0 w-[0.5px] bg-foreground/35"
                      style={{ left: `${z.pct}%` }}
                    />
                  ))}

                  {/* Bar sits at the vertical midpoint of the marker region */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
                    <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-foreground/10 shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                      <div
                        className="relative h-full rounded-full shadow-[0_14px_40px_rgba(34,197,94,0.32)]"
                        style={{
                          width: `${clampPct(carbonIntensity)}%`,
                          backgroundImage: carbonGradientFor(carbonIntensity),
                        }}
                      >
                        {/* subtle gloss */}
                        <div className="pointer-events-none absolute inset-0 opacity-80 [background:linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0.00))]" />
                        {/* inner edge highlight */}
                        <div className="pointer-events-none absolute inset-0 opacity-70 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.22)]" />
                      </div>
                      {/* track top sheen */}
                      <div className="pointer-events-none absolute inset-0 opacity-50 [background:linear-gradient(to_bottom,rgba(255,255,255,0.16),transparent)]" />
                    </div>
                  </div>
                </div>

                {/* Labels under each vertical marker (always centered) */}
                <div className="relative h-6 w-full">
                  {carbonZones.map((z) => (
                    <div
                      key={z.label}
                      className="pointer-events-none absolute top-2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium tracking-[-0.01em] text-foreground/45"
                      style={{ left: `${z.pct}%` }}
                    >
                      {z.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flow */}
        <div className="mt-20">
          <div className="relative w-full max-w-full">
            <div className="grid w-full max-w-full items-center gap-10 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
              {/* Left sphere */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative h-[210px] w-[210px] bg-transparent sm:h-[336px] sm:w-[336px]">
                  <div className="pointer-events-none absolute left-1/2 top-[86%] h-10 w-52 -translate-x-1/2 rounded-full bg-black/30 blur-xl sm:h-12 sm:w-60" />
                  <div className="pointer-events-none absolute left-1/2 top-[89%] h-7 w-40 -translate-x-1/2 rounded-full bg-black/35 blur-md sm:h-8 sm:w-46" />
                  <Image
                    src="/images/technology-end-sphere.png"
                    alt=""
                    width={336}
                    height={336}
                    sizes="168px"
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <span className="font-heading text-[11px] font-medium tracking-[-0.02em] text-white/92">
                      Physical Evidence
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle nodes */}
              <div className="relative w-full max-w-full">
                {/* Desktop horizontal rail (passes through node centers) */}
                <div className="pointer-events-none absolute inset-x-0 top-[24px] hidden h-px bg-foreground/15 lg:block" />

                {/* Mobile/Tablet: vertical flow (no horizontal scroll) */}
                <div className="relative lg:hidden">
                  <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/12" />
                  <div className="grid gap-5">
                    {nodes.map((n) => (
                      <div key={n.stepNumber} className="relative flex flex-col items-center gap-2 text-center">
                        <div
                          className={cn(
                            "relative z-10 flex h-12 w-12 items-center justify-center",
                            n.kind === "circle" ? "rounded-full" : "rounded-2xl",
                            "border border-foreground/15 bg-background shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
                            n.variant === "classified" &&
                              "border-foreground/10 bg-foreground/5 text-foreground/55",
                            n.variant === "terminal" && "border-foreground/25",
                          )}
                          aria-hidden="true"
                        >
                          <span className="text-[13px] font-medium text-foreground/70">
                            {n.stepNumber}
                          </span>
                        </div>

                        <div className="max-w-[90%] pt-1">
                          <div className="whitespace-pre-line text-[12px] font-medium leading-snug tracking-[-0.01em] text-foreground/80">
                            {n.label}
                          </div>
                          {n.detail ? (
                            <div className="mt-1 text-[11px] font-medium tracking-[-0.01em] text-foreground/60">
                              {n.detail}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: single-line horizontal nodes that shrink to fit */}
                <div className="hidden w-full grid-cols-6 items-start gap-3 lg:grid">
                  {nodes.map((n, idx) => (
                    <div key={n.stepNumber} className="relative flex flex-col items-center">
                      {/* small connector between nodes */}
                      {idx !== 0 ? (
                        <div className="pointer-events-none absolute -left-3 top-[24px] h-px w-3 bg-foreground/15" />
                      ) : null}

                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center",
                          n.kind === "circle" ? "rounded-full" : "rounded-2xl",
                          "border border-foreground/15 bg-background shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
                          n.variant === "classified" &&
                            "border-foreground/10 bg-foreground/5 text-foreground/55",
                          n.variant === "terminal" && "border-foreground/25",
                        )}
                        aria-hidden="true"
                      >
                        <span className="text-[13px] font-medium text-foreground/70">
                          {n.stepNumber}
                        </span>
                      </div>

                      {/* Labels: alternate above/below to avoid overlap */}
                      <div
                        className={cn(
                          "mt-3 text-center text-[11px] font-medium leading-snug tracking-[-0.01em] text-foreground/75 whitespace-pre-line",
                          idx % 2 === 1 && "mt-6",
                        )}
                      >
                        {n.label}
                      </div>
                      {n.detail ? (
                        <div className="mt-1 text-center text-[10px] font-medium text-foreground/60">
                          {n.detail}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right sphere */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative h-[210px] w-[210px] bg-transparent sm:h-[336px] sm:w-[336px]">
                  <div className="pointer-events-none absolute left-1/2 top-[86%] h-10 w-52 -translate-x-1/2 rounded-full bg-black/30 blur-xl sm:h-12 sm:w-60" />
                  <div className="pointer-events-none absolute left-1/2 top-[89%] h-7 w-40 -translate-x-1/2 rounded-full bg-black/35 blur-md sm:h-8 sm:w-46" />
                  <Image
                    src="/images/technology-end-sphere.png"
                    alt=""
                    width={336}
                    height={336}
                    sizes="168px"
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <span className="font-heading text-[11px] font-medium tracking-[-0.02em] text-white/92">
                      Auditable Data Asset
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

