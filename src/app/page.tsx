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
  title: "EcoTrace | Autonomous Scientific Traceability & Scope 3 Auditing",
  description:
    "EcoTrace is a trust settlement layer for global supply chains. Powered by Algorithm Ω, we replace industrial estimations with verifiable scientific evidence for UK SDR and CBAM compliance. High-fidelity data auditing for autonomous Scope 3 visibility.",
  keywords: [
    "Autonomous Scientific Traceability",
    "Algorithm Ω",
    "Scope 3 Industrial Data Auditing",
    "UK SDR compliance",
  ],
  openGraph: {
    title: "EcoTrace | Autonomous Scientific Traceability & Scope 3 Auditing",
    description:
      "EcoTrace is a trust settlement layer for global supply chains. Powered by Algorithm Ω, we replace industrial estimations with verifiable scientific evidence for UK SDR and CBAM compliance. High-fidelity data auditing for autonomous Scope 3 visibility.",
    type: "website",
    url: SITE_URL,
    siteName: "EcoTrace",
  },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "EcoTrace",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "EcoTrace is a trust settlement layer for global supply chains. Powered by Algorithm Ω, we replace industrial estimations with verifiable scientific evidence for UK SDR and CBAM compliance. High-fidelity data auditing for autonomous Scope 3 visibility.",
      keywords:
        "Autonomous Scientific Traceability, Algorithm Ω, Scope 3 Industrial Data Auditing, UK SDR compliance",
    },
    {
      "@type": "Service",
      name: "EcoTrace Scientific Traceability Service",
      provider: {
        "@type": "Organization",
        name: "EcoTrace Green Solutions Ltd",
        url: SITE_URL,
      },
      serviceType: "Scope 3 Industrial Data Auditing",
      areaServed: "Global",
      url: SITE_URL,
      description:
        "Autonomous Scientific Traceability powered by Algorithm Ω for UK SDR and CBAM-aligned industrial data auditing.",
      keywords:
        "Autonomous Scientific Traceability, Algorithm Ω, Scope 3 Industrial Data Auditing, UK SDR compliance",
    },
    {
      "@type": "DefinedTerm",
      name: "Autonomous Scientific Traceability",
      description:
        "A methodology for replacing estimation-based reporting with verifiable scientific evidence in industrial supply chains.",
      inDefinedTermSet: `${SITE_URL}/#terminology`,
      url: `${SITE_URL}/#autonomous-scientific-traceability`,
    },
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
          className="relative w-full bg-[#010101] pt-[20vh] pb-16 md:h-[calc((min(100vw,2492px)*1535/2492)/2)] md:pt-0 md:pb-0"
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
