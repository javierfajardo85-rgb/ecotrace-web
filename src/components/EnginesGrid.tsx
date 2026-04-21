import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Cloud,
  Droplets,
  Factory,
  Fuel,
  Recycle,
} from "lucide-react";
import Image from "next/image";

type Engine = {
  title: string;
  description: string;
  tag: string;
  icon: LucideIcon;
  imageSrc?: string;
  imageAlt?: string;
};

const engines: Engine[] = [
  {
    tag: "01",
    title: "Gasoil-Audit (Logistics)",
    description:
      "We audit fuel invoices to meet 'Net Zero' targets required by major logistics operators.",
    icon: Fuel,
    imageSrc: "/images/engine-gasoil-audit-sphere.png",
    imageAlt: "Gasoil carbon footprint audit visual",
  },
  {
    tag: "02",
    title: "Electro-Cert (Industrial)",
    description:
      "Clean energy certification for exports and compliance with the CBAM carbon tariff.",
    icon: Factory,
    imageSrc: "/images/engine-electro-cert-sphere.png",
    imageAlt: "Electro-Cert clean energy certification visual",
  },
  {
    tag: "03",
    title: "Water-Print (Food)",
    description:
      "Water footprint and water stress measurement to meet the requirements of major supermarket chains.",
    icon: Droplets,
    imageSrc: "/images/engine-water-print-sphere.png",
    imageAlt: "Water-Print water footprint verification visual",
  },
  {
    tag: "04",
    title: "Waste-Track (Waste)",
    description:
      "Notarial-grade circular traceability verification to ensure compliant waste recycling.",
    icon: Recycle,
    imageSrc: "/images/engine-waste-track.png",
    imageAlt: "Waste-Track circular economy traceability visual",
  },
  {
    tag: "05",
    title: "Digital-Carbon (Cloud)",
    description:
      "Auditing server emissions (AWS/Azure/Google Cloud) for corporate Scope 3 reporting.",
    icon: Cloud,
    imageSrc: "/images/engine-digital-carbon.png",
    imageAlt: "Digital-Carbon cloud emissions audit visual",
  },
  {
    tag: "06",
    title: "Material-Passport (Construction)",
    description:
      "Carbon passports for construction materials, optimizing value for LEED and BREEAM certifications.",
    icon: Building2,
    imageSrc: "/images/engine-material-passport.png",
    imageAlt: "Material-Passport embodied carbon verification visual",
  },
];

export function EnginesGrid({ className }: { className?: string }) {
  const previewEngines = engines.slice(0, 3);

  return (
    <section
      id="motores"
      className={cn(
        /*
         * “Swallow 100% of the hero”:
         * pull the section up by one full viewport so its background covers the hero,
         * then restore the natural content position via padding-top.
         */
        // Keep the 100% swallow, but start content much sooner to avoid any blank viewport.
        "relative z-50 -mt-[100dvh] pt-[14dvh] sm:pt-[16dvh] md:-mt-[100vh] md:pt-[20vh] rounded-t-[32px] bg-background text-foreground shadow-[0_-40px_120px_rgba(0,0,0,0.10)]",
        className,
      )}
    >
      {/* Opaque swallow edge (no transparency over hero) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 shadow-[0_-24px_60px_rgba(0,0,0,0.12)]" />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            SCIENTIFIC CARBON VALIDATION ENGINE (SCVE)
          </p>
          <h2 className="mt-3 font-heading text-[clamp(16px,3.2vw,36px)] leading-tight tracking-[-0.03em]">
            <span className="block text-center">
              The proprietary architecture engineered for the deterministic validation of
              high-dimensional physical datasets on a global scale
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            EcoTrace is not a reporting tool; it is a Scientific Carbon Validation Engine.
            Utilizing the Omega (Ω) architecture, our infrastructure processes unstructured
            telemetry from multiple industrial vectors, resolving complex physical variables
            through PINN-based inference. We transform heterogeneous industrial data into
            high-integrity technical assets, providing the scientific foundation required for
            alignment with international frameworks (ISO 14083, CSRD, GHG Protocol)
          </p>
        </div>

        <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {previewEngines.map((engine) => (
            <div
              key={engine.tag}
              className="group flex cursor-pointer flex-col text-center text-foreground"
            >
              {/* Floating sphere (no “window” container) */}
              <div className="relative mx-auto w-full max-w-[240px]">
                <div className="relative mx-auto aspect-square w-full will-change-transform group-hover:[animation:engine-sphere-bounce_1.6s_cubic-bezier(0.18,1,0.32,1)_both]">
                  {engine.imageSrc ? (
                    <Image
                      src={engine.imageSrc}
                      alt={engine.imageAlt ?? ""}
                      width={240}
                      height={240}
                      sizes="(min-width: 1024px) 240px, (min-width: 768px) 240px, 70vw"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-white/70 text-accent shadow-sm">
                        <engine.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="mt-7 font-heading text-2xl leading-snug tracking-[-0.02em] transition-colors duration-200 group-hover:text-foreground/40">
                {engine.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70 transition-colors duration-200 group-hover:text-foreground/42">
                {engine.description}
              </p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}

