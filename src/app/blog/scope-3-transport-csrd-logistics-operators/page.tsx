import type { Metadata } from "next";
import {
  ArticleH2,
  ArticleP,
  BlogArticleLayout,
} from "@/components/BlogArticleLayout";

const SITE_URL = "https://www.ecotracegreen.com";
const SLUG = "scope-3-transport-csrd-logistics-operators";

const meta = {
  title:
    "Scope 3 Transport Emissions Under CSRD: What Logistics Operators Need to Know",
  description:
    "CSRD expands mandatory sustainability reporting to thousands of companies. For logistics operators, Scope 3 Category 4 transport emissions are often the largest and least accurate part of the disclosure.",
  date: "2026-05-08",
  author: "EcoTrace Research",
  tags: [
    "CSRD",
    "Scope 3",
    "transport emissions",
    "logistics",
    "sustainability reporting",
  ] as const,
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
            This article is for informational purposes only and does not constitute legal,
            regulatory, or compliance advice.
          </em>
        </p>
      }
    >
      <ArticleP>
        The Corporate Sustainability Reporting Directive (CSRD) significantly expands the scope
        of mandatory sustainability disclosure across the European Union. For logistics
        operators — and for the large enterprises that procure logistics services — transport
        emissions represent one of the largest and most technically challenging categories to
        report accurately.
      </ArticleP>

      <ArticleH2>What CSRD Requires</ArticleH2>
      <ArticleP>
        CSRD mandates that in-scope companies report their greenhouse gas emissions in line with
        the European Sustainability Reporting Standards (ESRS). For transport and logistics,
        this means reporting Scope 3 Category 4 emissions: upstream transportation and
        distribution.
      </ArticleP>
      <ArticleP>
        The directive does not merely require a number. It requires organisations to disclose
        the data quality and methodology behind their calculations — distinguishing between
        primary activity data (actual measurements from real operations) and secondary data
        (industry averages and spend-based estimates).
      </ArticleP>
      <ArticleP>
        Companies disclosing Scope 3 transport emissions based on generic GLEC default factors
        will be required to acknowledge the data quality limitations of that approach. As
        third-party assurance requirements tighten, the distinction between estimated and
        calculated emissions will become a material consideration.
      </ArticleP>

      <ArticleH2>The Data Quality Problem</ArticleH2>
      <ArticleP>
        Logistics operators serving large enterprise customers face a specific challenge: their
        customers need shipment-level carbon data to populate their own CSRD disclosures. A
        consolidated annual average across an entire fleet does not meet this requirement.
      </ArticleP>
      <ArticleP>
        What enterprise customers increasingly need is CO2e data at the level of individual
        shipments — the carbon footprint of their specific cargo, on their specific routes,
        calculated from the actual conditions of each journey. This is a data quality
        requirement that most existing fleet carbon software is not designed to meet.
      </ArticleP>

      <ArticleH2>Primary Activity Data vs. Spend-Based Estimates</ArticleH2>
      <ArticleP>
        The GHG Protocol and ISO 14083 both establish a hierarchy of data quality for transport
        emissions calculations. Primary activity data — actual fuel consumption, actual route
        characteristics, actual load data — is preferred over distance-based estimates, which
        are in turn preferred over spend-based proxies.
      </ArticleP>
      <ArticleP>
        For HGV fleets where CAN Bus telemetry and fuel card data are already collected, the
        inputs for primary-activity-based CO2e calculation exist. The question is whether the
        software processing that data applies the methodology required to produce
        primary-activity-grade outputs — or whether it is simply multiplying distance by an
        emission factor and calling the result a measurement.
      </ArticleP>

      <ArticleH2>What This Means for Logistics Operators</ArticleH2>
      <ArticleP>
        Logistics operators who can provide customers with high-quality, journey-level CO2e data
        will be better positioned as CSRD reporting requirements expand. The ability to
        demonstrate that carbon data is calculated from primary activity data — not estimated
        from population averages — is becoming a commercial differentiator.
      </ArticleP>
      <ArticleP>
        Equally, logistics operators subject to CSRD in their own right will need to ensure that
        their internal Scope 1 and Scope 3 calculations meet the data quality standards the
        directive requires.
      </ArticleP>
    </BlogArticleLayout>
  );
}
