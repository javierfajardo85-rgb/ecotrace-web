import type { Metadata } from "next";
import {
  ArticleH2,
  ArticleP,
  ArticleUL,
  BlogArticleLayout,
} from "@/components/BlogArticleLayout";

const SITE_URL = "https://www.ecotracegreen.com";
const SLUG = "iso-14083-hgv-co2-measurement";

const meta = {
  title:
    "ISO 14083 and HGV Fleets: What Granular CO2e Measurement Actually Requires",
  description:
    "ISO 14083 sets the standard for greenhouse gas reporting in logistics. We explain what it demands from HGV operators and why per-trip measurement matters.",
  date: "2026-05-01",
  author: "EcoTrace Research",
  tags: ["ISO 14083", "HGV", "CO2 measurement", "logistics", "Scope 3"] as const,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `${SITE_URL}/blog/${SLUG}` },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${SITE_URL}/blog/${SLUG}`,
    type: "article",
    siteName: "EcoTrace",
  },
};

export default function Page() {
  return (
    <BlogArticleLayout
      title={meta.title}
      description={meta.description}
      date={meta.date}
      author={meta.author}
      tags={meta.tags}
      footer={
        <p>
          <em>
            EcoTrace Green Technologies Ltd is a UK-based software R&amp;D company developing
            physics-based CO2e calculation software for HGV logistics. Company No: 17180344.
          </em>
        </p>
      }
    >
      <ArticleP>
        ISO 14083:2023 establishes a harmonised methodology for quantifying and reporting
        greenhouse gas emissions across logistics operations. For operators of heavy goods
        vehicle (HGV) fleets, it represents both a compliance framework and a technical
        specification — one that requires more granular carbon data than most existing software
        tools currently provide.
      </ArticleP>

      <ArticleH2>What ISO 14083 Actually Specifies</ArticleH2>
      <ArticleP>
        The standard defines how organisations should calculate CO2e emissions from freight
        transport across all modes — road, rail, maritime, and air. For road freight, it
        specifies that emissions should be calculated using primary activity data wherever
        available: actual fuel consumption, actual load factors, and actual route
        characteristics.
      </ArticleP>
      <ArticleP>
        The default approach — applying a fixed emission factor to distance travelled — is
        permitted under the standard as a baseline method, but it produces estimates rather than
        measurements. ISO 14083 explicitly encourages organisations to use the highest-quality
        data available and to document the data tier their calculations rely on.
      </ArticleP>
      <ArticleP>
        For HGV operators seeking to provide credible carbon data to customers, regulators, or
        sustainability reporting frameworks, the distinction between a statistical estimate and
        a physics-derived calculation is increasingly significant.
      </ArticleP>

      <ArticleH2>Why Per-Trip CO2e Data Matters</ArticleH2>
      <ArticleP>
        A fleet of 150 HGVs operating across variable routes, loads, and conditions will produce
        a wide distribution of actual CO2e values per journey. Aggregating this into a single
        average figure obscures meaningful variation — and makes it impossible to identify which
        routes, loads, or driving patterns are the primary drivers of emissions.
      </ArticleP>
      <ArticleP>Per-trip CO2e data enables logistics operators to:</ArticleP>
      <ArticleUL>
        <li>
          Provide customers with shipment-level carbon data for their own Scope 3 reporting
        </li>
        <li>Identify operational efficiency opportunities at the route level</li>
        <li>
          Demonstrate measurable year-on-year reductions rather than estimated trajectories
        </li>
        <li>
          Support CSRD reporting with primary activity data rather than spend-based proxies
        </li>
      </ArticleUL>

      <ArticleH2>The Technical Challenge</ArticleH2>
      <ArticleP>
        Calculating per-trip CO2e from primary activity data requires resolving several physical
        variables simultaneously: vehicle mass (including load), road gradient, air resistance,
        engine efficiency, and rolling resistance. These variables interact dynamically across
        the duration of a journey.
      </ArticleP>
      <ArticleP>
        Conventional approaches either ignore this complexity (applying a fixed emission factor)
        or require hardware sensors installed on each vehicle (Portable Emissions Measurement
        Systems, or PEMS). Neither approach scales economically across a large fleet.
      </ArticleP>
      <ArticleP>
        Physics-based software that models vehicle dynamics directly from telemetry — processing
        GPS, speed, and fuel data through the governing equations of vehicle motion —
        represents an alternative pathway: calculation accuracy approaching hardware
        measurement, delivered as software.
      </ArticleP>

      <ArticleH2>Looking Ahead</ArticleH2>
      <ArticleP>
        As CSRD reporting requirements expand and customer demand for shipment-level carbon data
        grows, the quality of CO2e calculation methodology will become a material differentiator
        for logistics operators. ISO 14083 provides the framework. The technical question is
        what calculation method sits underneath it.
      </ArticleP>
    </BlogArticleLayout>
  );
}
