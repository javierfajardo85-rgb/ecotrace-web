// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
"use client";
import dynamic from "next/dynamic";
import type { CertLeg } from "@/lib/certificates/types";

// Leaflet has no SSR — dynamic import with ssr:false must live in a Client Component.
const RouteMap = dynamic(() => import("./route-map"), {
  ssr: false,
  loading: () => <div className="h-[360px] rounded-lg border bg-muted/30" />,
});

export function MapSection({ legs }: { legs: CertLeg[] }) {
  return <RouteMap legs={legs} />;
}
