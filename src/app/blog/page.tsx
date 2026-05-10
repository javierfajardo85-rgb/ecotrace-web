import type { Metadata } from "next";
import Link from "next/link";
import { HeaderNav } from "@/components/HeaderNav";
import { BlackFooterBar } from "@/components/BlackFooterBar";

const SITE_URL = "https://www.ecotracegreen.com";

export const metadata: Metadata = {
  title: "EcoTrace Insights | CO2 Measurement & HGV Logistics Research",
  description:
    "Technical articles on CO2 measurement for HGV fleets, ISO 14083 compliance, CSRD transport reporting, and physics-based emissions calculation.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "EcoTrace Insights | CO2 Measurement & HGV Logistics Research",
    description:
      "Technical articles on CO2 measurement for HGV fleets, ISO 14083 compliance, CSRD transport reporting, and physics-based emissions calculation.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "EcoTrace",
  },
};

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: readonly string[];
};

const posts: readonly Post[] = [
  {
    slug: "physics-informed-neural-networks-vehicle-emissions",
    title:
      "Physics-Informed Neural Networks for Vehicle Emissions: How the Technology Works",
    description:
      "Physics-Informed Neural Networks (PINNs) offer a different approach to vehicle emissions calculation — embedding physical laws directly into the learning process. This article explains the core concept.",
    date: "2026-05-10",
    tags: [
      "Physics-Informed Neural Networks",
      "PINN",
      "vehicle emissions",
      "CO2 calculation",
      "deep tech",
      "HGV",
    ],
  },
  {
    slug: "scope-3-transport-csrd-logistics-operators",
    title:
      "Scope 3 Transport Emissions Under CSRD: What Logistics Operators Need to Know",
    description:
      "CSRD expands mandatory sustainability reporting to thousands of companies. For logistics operators, Scope 3 Category 4 transport emissions are often the largest and least accurate part of the disclosure.",
    date: "2026-05-08",
    tags: ["CSRD", "Scope 3", "transport emissions", "logistics", "sustainability reporting"],
  },
  {
    slug: "why-average-emission-factors-fail-hgv-fleets",
    title: "Why Average Emission Factors Fail HGV Fleets — and What to Use Instead",
    description:
      "Most fleet carbon software applies a fixed emission factor to distance travelled. Here is why that produces inaccurate results for heavy goods vehicles — and what a physics-based alternative looks like.",
    date: "2026-05-05",
    tags: [
      "HGV emissions",
      "emission factors",
      "fleet carbon software",
      "CO2 calculation",
      "logistics",
    ],
  },
  {
    slug: "iso-14083-hgv-co2-measurement",
    title:
      "ISO 14083 and HGV Fleets: What Granular CO2e Measurement Actually Requires",
    description:
      "ISO 14083 sets the standard for greenhouse gas reporting in logistics. We explain what it demands from HGV operators and why per-trip measurement matters.",
    date: "2026-05-01",
    tags: ["ISO 14083", "HGV", "CO2 measurement", "logistics", "Scope 3"],
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeaderNav />
      <section className="mx-auto w-full max-w-5xl px-6 pb-24 pt-[120px] sm:px-8 sm:pt-[140px]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            EcoTrace Insights
          </p>
          <h1 className="mt-4 font-heading text-[clamp(30px,5vw,52px)] font-light leading-[1.1] tracking-[-0.02em] text-foreground">
            CO2 measurement &amp; HGV logistics research
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Technical articles on physics-based CO2e calculation for heavy goods vehicle fleets,
            ISO 14083 compliance, and the data quality requirements of Scope 3 transport
            reporting.
          </p>
        </header>

        <ul className="mx-auto mt-16 grid max-w-4xl gap-10 sm:mt-20">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-foreground/10 pb-10 last:border-b-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block transition-opacity hover:opacity-90"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {formatDate(post.date)}
                </p>
                <h2 className="mt-3 font-heading text-[clamp(22px,3vw,30px)] font-light leading-tight tracking-[-0.01em] text-foreground group-hover:text-foreground/90">
                  {post.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-foreground/15 bg-white/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/70 backdrop-blur"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/60 group-hover:text-foreground/90">
                  Read article →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <BlackFooterBar />
    </main>
  );
}
