import { EnginesGrid } from "@/components/EnginesGrid";
import { HeaderNav } from "@/components/HeaderNav";
import { HeroPageLead } from "@/components/HeroPageLead";
import { TechnologySection } from "@/components/TechnologySection";
import { GrowthRoadmapSection } from "@/components/GrowthRoadmapSection";
import { PartnerWithUsBanner } from "@/components/PartnerWithUsBanner";
import { PartnerLinksStrip } from "@/components/PartnerLinksStrip";
import { BlackFooterBar } from "@/components/BlackFooterBar";
import { AboutCtasRow } from "@/components/AboutCtasRow";

export default function Home() {
  return (
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
        className="h-[calc((min(100vw,2492px)*1535/2492)/2)] w-full bg-[#010101]"
      >
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-start px-6 pt-6 sm:px-12 sm:pt-8">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            The Path to Scale
          </p>
          <div className="mt-6 w-full">
            <AboutCtasRow />
          </div>
        </div>
      </section>
      <BlackFooterBar />
    </main>
  );
}
