import { cn } from "@/lib/utils";
import Image from "next/image";

export function PartnerLinksStrip({ className }: { className?: string }) {
  return (
    <section id="about" className={cn("w-full text-white", className)}>
      {/* Render image at max native size (avoid upscaling blur). */}
      <div className="relative w-full overflow-hidden bg-[#010101] py-28 sm:py-36">
        {/* Top & bottom extensions matching the image black */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[#010101]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[#010101]" />
        <div className="relative mx-auto w-full max-w-[2492px] px-6 sm:px-12">
          <div className="relative mx-auto aspect-[2492/1535] w-full max-w-[2492px]">
            <Image
              src="/images/Gemini_Generated_Image_e6slaxe6slaxe6sl.jpg"
              alt=""
              width={2492}
              height={1535}
              unoptimized
              priority={false}
              sizes="2492px"
              className="h-auto w-full select-none"
            />
            {/* Contrast layer so pills stay crisp */}
            <div className="pointer-events-none absolute inset-0 bg-black/28" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_45%,rgba(0,0,0,0.05),rgba(0,0,0,0.55))]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex w-full max-w-3xl flex-col items-center px-4 text-center">
                <div className="w-full">
                  <p className="text-[8px] font-extralight uppercase tracking-[0.18em] text-white/65 md:text-[11px] md:tracking-[0.20em]">
                    About us
                  </p>
                  <p className="mt-2 text-xs font-light leading-normal tracking-[-0.01em] text-white/78 md:mt-4 md:text-base md:leading-relaxed">
                    EcoTrace was established as a high-scalability SaaS infrastructure designed to
                    automate industrial data integrity within global supply chains. Our mission is
                    to eliminate reliance on manual processes through Algorithm Ω, transforming
                    regulatory compliance into a flow of auditable, truthful digital assets
                    available in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

