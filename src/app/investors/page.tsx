import type { Metadata } from "next";
import InvestorsClient from "./InvestorsClient";

export const metadata: Metadata = {
  title: "EcoTrace — Investor Overview",
  description:
    "EcoTrace Green Technologies Ltd — Pre-Seed SEIS Investment Overview. Physics-based carbon data infrastructure for global logistics.",
  alternates: { canonical: "https://www.ecotracegreen.com/investors" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "EcoTrace Green Technologies — Pre-Seed SEIS Investment",
    description:
      "Engineering a physics-based carbon data infrastructure for global logistics. £250k Pre-Seed SEIS round open.",
    url: "https://www.ecotracegreen.com/investors",
    type: "website",
    siteName: "EcoTrace Green Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoTrace Green Technologies — Pre-Seed SEIS Investment",
    description:
      "Engineering a physics-based carbon data infrastructure for global logistics. £250k Pre-Seed SEIS round open.",
  },
};

export default function InvestorsPage() {
  return <InvestorsClient />;
}
