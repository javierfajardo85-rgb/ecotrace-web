import type { Metadata } from "next";
import Link from "next/link";
import { HeaderNav } from "@/components/HeaderNav";
import { BlackFooterBar } from "@/components/BlackFooterBar";

const SITE_URL = "https://www.ecotracegreen.com";

export const metadata: Metadata = {
  title: "How EcoTrace Calculates HGV CO2e | Physics-Based Fleet Carbon Data",
  description:
    "EcoTrace calculates the CO2e footprint of each HGV journey from vehicle physics — not statistical averages. Per-trip carbon data for logistics operators aligned with ISO 14083.",
  alternates: { canonical: `${SITE_URL}/product` },
  openGraph: {
    title: "How EcoTrace Calculates HGV CO2e | Physics-Based Fleet Carbon Data",
    description:
      "EcoTrace calculates the CO2e footprint of each HGV journey from vehicle physics — not statistical averages. Per-trip carbon data for logistics operators aligned with ISO 14083.",
    url: `${SITE_URL}/product`,
    type: "website",
    siteName: "EcoTrace",
  },
};

type Row = readonly [string, string];

const developmentStages: readonly Row[] = [
  ["Core PINN architecture — synthetic data", "Validated — MAPE 0.62%"],
  ["Full tri-PDE system — synthetic data", "In development"],
  ["Real fleet telemetry integration", "Planned — post-investment"],
  ["ISO 14083 alignment validation", "Planned — post-investment"],
  ["Operational pilot — HGV fleet", "Planned Q3 2026"],
];

function SectionH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[clamp(22px,3vw,32px)] font-light leading-tight tracking-[-0.02em] text-foreground">
      {children}
    </h2>
  );
}

function Section({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t border-foreground/10 py-14 first:border-t-0 first:pt-0 sm:py-16"
    >
      <div className="mx-auto max-w-3xl space-y-5 text-[15px] leading-[1.75] text-foreground/85 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      <section className="mx-auto w-full max-w-5xl px-6 pt-[120px] pb-6 sm:px-8 sm:pt-[140px] sm:pb-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Product
          </p>
          <h1 className="mt-4 font-heading text-[clamp(30px,5vw,52px)] font-light leading-[1.08] tracking-[-0.02em] text-foreground">
            How EcoTrace Calculates CO2e for HGV Fleets
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Most fleet carbon software multiplies distance by an average emission factor.
            EcoTrace is developing a different approach: software that derives CO2e from the
            physical laws governing each vehicle&apos;s actual journey — speed, gradient, load,
            and engine characteristics — calculated simultaneously.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 pb-24 sm:px-8">
        <Section>
          <SectionH2>The limitation of average emission factors</SectionH2>
          <p>
            A standard emission factor for an HGV diesel vehicle is an industry average. It does
            not account for the load your vehicle was carrying, the gradient of the route, the
            efficiency characteristics of that specific engine, or the driving conditions on
            that journey.
          </p>
          <p>
            For logistics operators providing carbon data to enterprise customers — or
            reporting their own Scope 3 emissions under CSRD — the gap between an estimated
            average and a journey-specific calculation is meaningful. ISO 14083 distinguishes
            between primary activity data (calculated from actual operational inputs) and
            secondary data (derived from population averages). The data quality tier determines
            the credibility of the disclosure.
          </p>
        </Section>

        <Section>
          <SectionH2>Physics-based CO2e calculation — what it means in practice</SectionH2>
          <p>
            EcoTrace is developing the Scientific Carbon Validation Engine (SCVE), a software
            system that calculates CO2e at the level of individual HGV journeys.
          </p>
          <p>
            The SCVE uses Physics-Informed Neural Networks (PINNs) — a class of machine
            learning architecture that embeds physical governing equations directly into the
            training process. For a heavy goods vehicle, these equations describe how traction
            force, aerodynamic drag, road gradient, rolling resistance, and engine efficiency
            interact to determine fuel consumption at every point along a journey.
          </p>
          <p>From this, the system derives:</p>
          <ul className="ml-5 list-disc space-y-2 marker:text-foreground/40">
            <li>
              <strong>Fuel consumption per trip</strong> — calculated from vehicle dynamics, not
              estimated from distance
            </li>
            <li>
              <strong>CO2e per trip</strong> — derived from calculated fuel consumption and
              established emission factors
            </li>
            <li>
              <strong>Vehicle-specific parameter calibration</strong> — engine efficiency and
              rolling resistance coefficients calibrated to each vehicle from its own telemetry
              data, without requiring manual measurement
            </li>
          </ul>
          <p>
            The inputs the system processes are those most modern HGV fleets already collect:
            GPS speed data, route elevation, and fuel records.
          </p>
        </Section>

        <Section>
          <SectionH2>Current development stage</SectionH2>
          <p>
            EcoTrace is at the R&amp;D stage. Proof-of-concept experiments conducted in early
            2026 on synthetic datasets demonstrated that the core PINN architecture achieves
            sub-1% Mean Absolute Percentage Error (MAPE) for fuel consumption prediction on
            variable-gradient routes — within the accuracy target specified for the system.
          </p>
          <p>
            The full system — incorporating real vehicle telemetry from operational fleets,
            multi-vehicle calibration, and alignment with ISO 14083 — is the subject of ongoing
            R&amp;D development.
          </p>
          <p>
            We are not yet offering a commercial product. We are building the technical
            foundation for one.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-foreground/10 bg-white/50 backdrop-blur">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/[0.03]">
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Development Phase
                  </th>
                  <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {developmentStages.map(([phase, status]) => (
                  <tr
                    key={phase}
                    className="border-b border-foreground/10 last:border-b-0"
                  >
                    <td className="px-5 py-3 text-foreground/85">{phase}</td>
                    <td className="px-5 py-3 text-foreground/85">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section>
          <SectionH2>Designed for logistics operators and sustainability consultancies</SectionH2>
          <p>
            The SCVE is being developed as a B2B software API — accessible to logistics
            operators directly, and to sustainability consultancies and ERP implementation
            partners managing carbon reporting for logistics clients.
          </p>
          <p>Target users include:</p>
          <ul className="ml-5 list-disc space-y-2 marker:text-foreground/40">
            <li>
              <strong>Sustainability managers</strong> at logistics and freight companies who
              need journey-level CO2e data for customer reporting and internal reduction
              tracking
            </li>
            <li>
              <strong>Sustainability consultancies</strong> providing ISO 14083 and CSRD
              advisory services to logistics clients
            </li>
            <li>
              <strong>ERP and TMS implementation partners</strong> integrating carbon data into
              existing logistics management infrastructure
            </li>
          </ul>
        </Section>

        <Section>
          <SectionH2>Follow our R&amp;D progress</SectionH2>
          <p>
            EcoTrace is in active R&amp;D. If you are a logistics operator, sustainability
            consultancy, or technical partner interested in following our development — or in
            participating in our planned operational pilot — we would welcome the conversation.
          </p>
          <div className="pt-2">
            <Link
              href="/#contacto"
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-xs font-medium uppercase tracking-[0.14em] text-accent-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Get in touch
            </Link>
          </div>
          <p className="pt-8 text-xs leading-relaxed text-muted-foreground">
            <em>
              EcoTrace Green Technologies Ltd — Company No: 17180344 — London, United Kingdom.
              The SCVE is under active R&amp;D development. No commercial product is currently
              available. Results cited refer to proof-of-concept experiments conducted on
              synthetic datasets.
            </em>
          </p>
        </Section>
      </div>

      <BlackFooterBar />
    </main>
  );
}
