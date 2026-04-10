import { cn } from "@/lib/utils";

export function PartnerWithUsBanner({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-background text-foreground", className)}>
      {/* Full-bleed video background */}
      <div
        className="relative w-full overflow-hidden bg-[#010101] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/partner-links-bg-v2.png')" }}
      >
        {/* Video background (Safari iOS compatible autoplay). */}
        <video
          className="absolute inset-0 h-full w-full object-cover [filter:brightness(1.35)_contrast(1.1)_saturate(1.2)]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/partner-links-bg-v2.png"
        >
          <source src="/videos/partner-fluid.mp4" type="video/mp4" />
        </video>

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

