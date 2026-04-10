import { cn } from "@/lib/utils";

export function PartnerWithUsBanner({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-background text-foreground", className)}>
      {/* Full-bleed video background */}
      <div className="relative w-full overflow-hidden bg-[#010101]">
        {/* Video (desktop+) */}
        <video
          className="absolute inset-0 hidden h-full w-full object-cover md:block [filter:brightness(1.35)_contrast(1.1)_saturate(1.2)]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/partner-fluid.mp4" type="video/mp4" />
        </video>

        {/* Mobile fallback (no video) */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_35%,rgba(0,162,230,0.26),transparent_62%),radial-gradient(900px_circle_at_70%_55%,rgba(30,64,175,0.22),transparent_60%),linear-gradient(135deg,rgba(0,0,0,0.84),rgba(0,0,0,0.92))] md:hidden" />

        {/* Readability overlay (lighter to keep video luminous) */}
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_50%_40%,rgba(0,0,0,0.18),rgba(0,0,0,0.62))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/55" />

        {/* Content stays centered, background stays full-width */}
        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-6 py-24 text-center sm:px-12 sm:py-32">
          <p className="mx-auto max-w-4xl font-heading text-[32px] leading-snug tracking-[-0.02em] text-white sm:text-[48px]">
            We transform the most demanding challenges into automated traceability solutions,
            putting the technical answers our clients need into their hands. We are here to solve
            today’s problems and, together, anticipate what tomorrow will bring
          </p>
        </div>
      </div>
    </section>
  );
}

