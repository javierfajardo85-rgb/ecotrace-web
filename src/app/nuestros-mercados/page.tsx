import { HeaderNav } from "@/components/HeaderNav";
import { FloatingMarketSphere } from "@/components/FloatingMarketSphere";

const markets = [
  {
    title: "Fuels & Hydrocarbons in Global Mobility",
    description:
      "Traceable auditing of fossil fuel consumption for the standardization of emissions per route and load unit.",
    imageSrc: "/images/engine-gasoil-audit-sphere.png",
    imageAlt: "Gasoil carbon footprint audit visual",
  },
  {
    title: "Power & Energy in Advanced Manufacturing",
    description:
      "Auditing of energy mix and consumption for the validation of industrial emissions and carbon tariff compliance.",
    imageSrc: "/images/engine-electro-cert-sphere.png",
    imageAlt: "Electro-Cert clean energy certification visual",
  },
  {
    title: "Water Resources in Agri-Food Systems",
    description:
      "Validation of water footprint and operational efficiency through automated auditing of water rights and consumption records.",
    imageSrc: "/images/engine-water-print-sphere.png",
    imageAlt: "Water-Print water footprint verification visual",
  },
  {
    title: "Circular Flows in Resource Recovery",
    description:
      "Automated traceability of waste flows for the certification of recycling processes and extended producer responsibility.",
    imageSrc: "/images/engine-waste-track-sphere.png",
    imageAlt: "Waste-Track circular economy traceability visual",
  },
  {
    title: "Digital Assets in Cloud Architecture",
    description:
      "Quantification of Scope 3 emissions through cloud service auditing for the standardization of digital environmental impact.",
    imageSrc: "/images/engine-digital-carbon-cloud.png",
    imageAlt: "Digital-Carbon cloud emissions audit visual",
    sphereImageClassName: "scale-[1.62] -translate-x-[14px]",
  },
  {
    title: "Industrial Materials in the Built Environment",
    description:
      "Carbon footprint certification of materials through technical auditing of supplies in specific construction projects.",
    imageSrc: "/images/engine-material-passport-sphere.png",
    imageAlt: "Material-Passport embodied carbon verification visual",
  },
] as const;

export default function NuestrosMercadosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeaderNav />
      {/* Solugen-like page lead (background image will be added later) */}
      <header className="relative h-[62vh] min-h-[420px] overflow-hidden bg-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/our-markets-bg.mov" type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-white/45" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_45%,rgba(255,255,255,0.25),rgba(255,255,255,0.85))]" />

        <div className="relative mx-auto flex h-full max-w-6xl items-center justify-center px-4 sm:px-6">
          <h1 className="font-heading text-[33px] leading-none tracking-[-0.03em] text-foreground/90 sm:text-[48px]">
            Market Applications
          </h1>
        </div>
      </header>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="mx-auto max-w-4xl text-center text-[18px] leading-relaxed tracking-[-0.01em] text-foreground/80 sm:text-[20px]">
            Fostering innovation and rapid response, we deliver global solutions from the UK that
            optimize execution by validating operational integrity and providing technical peace of
            mind to today’s strategic industries
          </p>

          <div className="mt-14 grid gap-x-16 gap-y-20 md:mt-20 md:grid-cols-2">
            {markets.map((m) => (
              <article key={m.title} className="text-center">
                <FloatingMarketSphere
                  imageSrc={m.imageSrc}
                  imageAlt={m.imageAlt}
                  imageClassName={"sphereImageClassName" in m ? m.sphereImageClassName : undefined}
                />

                <h2 className="mt-8 font-heading text-3xl leading-tight tracking-[-0.02em] text-foreground/95">
                  {m.title}
                </h2>
                <p className="mx-auto mt-4 max-w-[34ch] text-sm leading-relaxed text-foreground/70">
                  {m.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

