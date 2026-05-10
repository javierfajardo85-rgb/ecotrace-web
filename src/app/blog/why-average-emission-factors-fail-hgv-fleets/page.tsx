import type { Metadata } from "next";
import {
  ArticleH2,
  ArticleP,
  BlogArticleLayout,
} from "@/components/BlogArticleLayout";

const SITE_URL = "https://www.ecotracegreen.com";
const SLUG = "why-average-emission-factors-fail-hgv-fleets";

const meta = {
  title: "Why Average Emission Factors Fail HGV Fleets — and What to Use Instead",
  description:
    "Most fleet carbon software applies a fixed emission factor to distance travelled. Here is why that produces inaccurate results for heavy goods vehicles — and what a physics-based alternative looks like.",
  date: "2026-05-05",
  author: "EcoTrace Research",
  tags: [
    "HGV emissions",
    "emission factors",
    "fleet carbon software",
    "CO2 calculation",
    "logistics",
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
          </em>
        </p>
      }
    >
      <ArticleP>
        Most carbon accounting software for logistics works the same way: multiply distance
        travelled by an emission factor (expressed in kgCO2e per tonne-kilometre), and report
        the result. The GLEC Framework and ISO 14083 both permit this approach as a baseline
        method.
      </ArticleP>
      <ArticleP>
        The problem is that average emission factors are, by definition, averages. For a heavy
        goods vehicle operating in variable real-world conditions, the gap between the average
        and the actual can be substantial.
      </ArticleP>

      <ArticleH2>What Average Emission Factors Miss</ArticleH2>
      <ArticleP>
        A standard HGV diesel emission factor is derived from aggregate data across many
        vehicles, routes, and operating conditions. It does not account for:
      </ArticleP>
      <ArticleP>
        <strong>Load variation.</strong> A vehicle carrying 28 tonnes burns significantly more
        fuel per kilometre than the same vehicle carrying 12 tonnes on the same route. Emission
        factors typically assume an average load factor.
      </ArticleP>
      <ArticleP>
        <strong>Gradient.</strong> A route across the Pennines demands substantially more fuel
        than an equivalent-distance motorway run across the Midlands. Gradient is not captured
        in a distance-based emission factor.
      </ArticleP>
      <ArticleP>
        <strong>Vehicle-specific efficiency.</strong> Two HGVs of the same nominal type will
        have different engine efficiencies, tyre rolling resistance values, and aerodynamic
        profiles — all of which affect actual fuel consumption.
      </ArticleP>
      <ArticleP>
        <strong>Driving behaviour.</strong> Aggressive acceleration and braking patterns
        increase fuel consumption above the modelled average. Fuel-efficient driving reduces it.
      </ArticleP>
      <ArticleP>
        The cumulative effect of these variables means that a fixed emission factor applied to a
        diverse HGV fleet will produce CO2e estimates that are accurate on average but
        systematically wrong at the individual journey level.
      </ArticleP>

      <ArticleH2>The Hardware Alternative — and Its Limits</ArticleH2>
      <ArticleP>
        Portable Emissions Measurement Systems (PEMS) are the regulatory gold standard for
        vehicle emissions measurement. A PEMS unit installed on an HGV measures exhaust gases
        directly, producing accurate real-world emissions data.
      </ArticleP>
      <ArticleP>
        The limitation is economic. A PEMS unit costs tens of thousands of pounds and requires
        specialist operation. It is used for type-approval testing and periodic compliance
        verification — not for continuous monitoring across an operational fleet.
      </ArticleP>

      <ArticleH2>A Physics-Based Software Approach</ArticleH2>
      <ArticleP>
        An alternative to both average emission factors and physical sensors is software that
        models the vehicle&apos;s actual fuel consumption from its telemetry data — applying the
        physical equations that govern vehicle motion to derive what the engine must have
        consumed on a given journey.
      </ArticleP>
      <ArticleP>
        This approach uses inputs that most modern HGVs already generate: GPS speed data, route
        elevation, and fuel card records. From these, the governing equations of longitudinal
        vehicle dynamics can reconstruct fuel consumption at a level of precision that generic
        emission factors cannot approach.
      </ArticleP>
      <ArticleP>
        The output is CO2e data specific to each journey — calculated from the physics of that
        particular vehicle, on that particular route, under that particular load — rather than
        derived from population-level averages.
      </ArticleP>
      <ArticleP>
        This is the calculation methodology EcoTrace is developing: software that applies the
        same physical principles as hardware PEMS, without requiring hardware installation on
        every vehicle.
      </ArticleP>
    </BlogArticleLayout>
  );
}
