import type { Metadata } from "next";
import { EnginesGrid } from "@/components/EnginesGrid";
import { HeaderNav } from "@/components/HeaderNav";
import { HeroPageLead } from "@/components/HeroPageLead";
import { TechnologySection } from "@/components/TechnologySection";
import { GrowthRoadmapSection } from "@/components/GrowthRoadmapSection";
import { PartnerWithUsBanner } from "@/components/PartnerWithUsBanner";
import { PartnerLinksStrip } from "@/components/PartnerLinksStrip";
import { BlackFooterBar } from "@/components/BlackFooterBar";
import { AboutCtasRow } from "@/components/AboutCtasRow";

const SITE_URL = "https://ecotracegreen.com";

export const metadata: Metadata = {
  title: "EcoTrace | CO2 Measurement Software for HGV Fleets | ISO 14083",
  description:
    "EcoTrace calculates the precise CO2e footprint of every HGV journey using physics-based software — not statistical averages. Per-trip carbon data aligned with ISO 14083 for logistics operators and sustainability teams.",
  keywords: [
    "CO2 measurement HGV",
    "fleet carbon tracking software",
    "ISO 14083 compliance",
    "per trip CO2e calculation",
    "heavy goods vehicle emissions",
    "logistics carbon footprint",
    "freight emissions software UK",
    "carbon data logistics",
    "HGV fuel consumption tracking",
    "Scope 3 transport emissions",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "EcoTrace | CO2 Measurement Software for HGV Fleets",
    description:
      "Physics-based software that calculates the precise CO2e footprint of every HGV journey. Per-trip carbon data for logistics operators — aligned with ISO 14083.",
    type: "website",
    url: SITE_URL,
    siteName: "EcoTrace",
  },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EcoTrace Green Technologies Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logoEcoTrace.jpg`,
  description:
    "Software R&D company developing physics-based CO2e calculation software for HGV logistics fleets. Aligned with ISO 14083.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  foundingDate: "2026",
  sameAs: [
    "https://linkedin.com/company/ecotracegreen",
    "https://x.com/EcoTraceTech",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Structured data for search engines (SoftwareApplication + Service + DefinedTerm).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      <main className="min-h-screen">
        <HeaderNav />
        <HeroPageLead />
        <EnginesGrid />
        <TechnologySection />
        <GrowthRoadmapSection />
        <PartnerWithUsBanner />
        <PartnerLinksStrip />
        <section
          id="contacto"
          className="relative w-full bg-black pt-[20vh] pb-16 md:h-[calc((min(100vw,2492px)*1535/2492)/2)] md:pt-0 md:pb-0"
        >
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-start px-6 sm:px-12 md:pt-8">
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
              The Path to Scale
            </p>
            <div className="mt-8 w-full md:mt-6">
              <AboutCtasRow />
            </div>
          </div>
        </section>
        <BlackFooterBar />
      </main>
    </>
  );
}
