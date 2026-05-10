import type { Metadata } from "next";
import {
  ArticleH2,
  ArticleP,
  BlogArticleLayout,
} from "@/components/BlogArticleLayout";

const SITE_URL = "https://www.ecotracegreen.com";
const SLUG = "physics-informed-neural-networks-vehicle-emissions";

const meta = {
  title:
    "Physics-Informed Neural Networks for Vehicle Emissions: How the Technology Works",
  description:
    "Physics-Informed Neural Networks (PINNs) offer a different approach to vehicle emissions calculation — embedding physical laws directly into the learning process. This article explains the core concept.",
  date: "2026-05-10",
  author: "EcoTrace Research",
  tags: [
    "Physics-Informed Neural Networks",
    "PINN",
    "vehicle emissions",
    "CO2 calculation",
    "deep tech",
    "HGV",
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
            EcoTrace Green Technologies Ltd is a UK-based software R&amp;D company (Company No:
            17180344) developing physics-based CO2e calculation software for HGV logistics.
            Proof-of-concept results cited above were produced using synthetic datasets under
            controlled experimental conditions. All data is 100% synthetic — no real vehicle
            telemetry has been used to date.
          </em>
        </p>
      }
    >
      <ArticleP>
        Conventional approaches to vehicle emissions calculation fall broadly into two
        categories: empirical models that apply statistical averages to fleet data, and hardware
        sensors that measure exhaust gases directly. Physics-Informed Neural Networks (PINNs)
        represent a third approach — one that embeds the governing physical equations of
        vehicle dynamics directly into a machine learning architecture.
      </ArticleP>

      <ArticleH2>The Core Concept</ArticleH2>
      <ArticleP>
        A standard neural network learns patterns from data. Given enough examples of inputs and
        outputs, it can approximate the relationship between them. The limitation for emissions
        calculation is that learning from data alone — without physical constraints — can
        produce outputs that are statistically plausible but physically impossible.
      </ArticleP>
      <ArticleP>
        A Physics-Informed Neural Network adds a second objective to the training process. In
        addition to fitting the observed data, the network must simultaneously satisfy the
        physical equations that govern the system being modelled. For a heavy goods vehicle,
        these equations describe how the forces acting on a vehicle — traction, aerodynamic
        drag, gradient resistance, rolling resistance — determine its fuel consumption at every
        point along a journey.
      </ArticleP>
      <ArticleP>
        The result is a model that respects the physics of vehicle dynamics. It cannot, for
        example, infer a fuel consumption value that violates conservation of energy. The
        physical equations act as hard constraints that bound the solution space to what is
        physically possible.
      </ArticleP>

      <ArticleH2>Why This Matters for CO2e Calculation</ArticleH2>
      <ArticleP>
        For HGV emissions calculation, the PINN approach offers a specific advantage: the
        ability to calibrate vehicle-specific physical parameters — engine efficiency (η) and
        rolling resistance coefficient (C_rr) — directly from operational telemetry, without
        requiring manual measurement or manufacturer data.
      </ArticleP>
      <ArticleP>
        These parameters vary between vehicles of nominally the same type. An older engine
        operating under heavy load in hilly terrain will have different effective efficiency
        characteristics than a new engine on a flat motorway run. Standard emission factor
        approaches cannot capture this variation. A PINN-based system, by solving for these
        parameters as part of the training process, produces calculations that are specific to
        each vehicle&apos;s actual physical characteristics.
      </ArticleP>

      <ArticleH2>The State of the Research</ArticleH2>
      <ArticleP>
        PINNs were formalised as a computational methodology by Raissi, Perdikaris, and
        Karniadakis (2019) and have since been applied across a range of scientific and
        engineering domains — fluid dynamics, heat transfer, structural mechanics, and others.
        Application to vehicle dynamics and transport emissions calculation is an active area
        of research.
      </ArticleP>
      <ArticleP>
        EcoTrace is developing a PINN-based architecture specifically for HGV fuel consumption
        and CO2e calculation — the Scientific Carbon Validation Engine (SCVE). Proof-of-concept
        experiments conducted in early 2026 on synthetic datasets achieved a Mean Absolute
        Percentage Error (MAPE) of 0.62% for fuel consumption prediction on a variable-gradient
        route, within the sub-1% target specified for the system.
      </ArticleP>
      <ArticleP>
        This work is at the R&amp;D stage. The full system — incorporating real vehicle
        telemetry, multi-fleet calibration, and ISO 14083 alignment — is the subject of
        ongoing development.
      </ArticleP>

      <ArticleH2>Practical Implications</ArticleH2>
      <ArticleP>
        For logistics operators and sustainability teams, the practical implication of a
        PINN-based approach is the possibility of CO2e calculation accuracy approaching hardware
        measurement, delivered as software that processes existing telemetry data — without
        requiring physical sensors to be installed on every vehicle.
      </ArticleP>
      <ArticleP>
        Whether this promise is fully realised in operational conditions with heterogeneous
        fleets and real-world data quality is the central technical question that
        EcoTrace&apos;s R&amp;D programme is designed to answer.
      </ArticleP>
    </BlogArticleLayout>
  );
}
