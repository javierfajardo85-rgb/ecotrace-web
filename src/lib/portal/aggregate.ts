// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
// Pure aggregation of a client's real CertRecord[] into dashboard view models.
// Every number here is computed from the client's own certified operations —
// nothing is invented. (This mirrors the visual richness of the old mock
// /dashboard prototype, but every figure traces back to a real certificate.)
import type { CertRecord } from "@/lib/certificates/types";

export interface PortalSummary {
  opsCount: number;
  measuredCo2eKg: number;
  avgIntensity: number | null; // mean gCO2e/tkm across ops that have an ECI metric
  certifiedCount: number; // VCI >= 50
  certifiedPct: number;
  latestCertifiedAt: string | null; // most recent RFC 3161 timestamp among the ops
}

export function portalSummary(records: CertRecord[]): PortalSummary {
  const opsCount = records.length;
  const measuredCo2eKg = records.reduce((a, r) => a + r.summary.total_co2e_kg, 0);
  const withIntensity = records.filter((r) => r.summary.eci_metric_gco2e_per_tkm != null);
  const avgIntensity = withIntensity.length
    ? withIntensity.reduce((a, r) => a + (r.summary.eci_metric_gco2e_per_tkm ?? 0), 0) / withIntensity.length
    : null;
  const certifiedCount = records.filter((r) => r.summary.operation_vci >= 50).length;
  const timestamps = records.map((r) => r.anchor.timestamp).filter((t): t is string => !!t).sort();
  return {
    opsCount,
    measuredCo2eKg,
    avgIntensity,
    certifiedCount,
    certifiedPct: opsCount ? Math.round((certifiedCount / opsCount) * 100) : 0,
    latestCertifiedAt: timestamps.length ? timestamps[timestamps.length - 1] : null,
  };
}

export interface VehicleSegment { vehicle: string; count: number; sharePct: number; avgIntensity: number | null }

export function vehicleSegments(records: CertRecord[]): VehicleSegment[] {
  const groups = new Map<string, CertRecord[]>();
  for (const r of records) {
    const v = r.facts?.vehicle ?? "Unknown";
    groups.set(v, [...(groups.get(v) ?? []), r]);
  }
  const total = records.length || 1;
  return Array.from(groups.entries())
    .map(([vehicle, rs]) => {
      const withIntensity = rs.filter((r) => r.summary.eci_metric_gco2e_per_tkm != null);
      return {
        vehicle,
        count: rs.length,
        sharePct: Math.round((rs.length / total) * 100),
        avgIntensity: withIntensity.length
          ? Math.round(withIntensity.reduce((a, r) => a + (r.summary.eci_metric_gco2e_per_tkm ?? 0), 0) / withIntensity.length)
          : null,
      };
    })
    .sort((a, b) => b.count - a.count);
}

export interface PortalRouteRow {
  opId: string; route: string; vehicle: string; co2eKg: number; eciGrade: string | null; vci: number; certified: boolean;
}

export function portalRoutes(records: CertRecord[]): PortalRouteRow[] {
  return records
    .map((r) => {
      const legs = r.legs ?? [];
      const route = legs.length ? [legs[0].origin, ...legs.map((l) => l.dest)].join(" → ") : "—";
      return {
        opId: r.op_id, route, vehicle: r.facts?.vehicle ?? "—",
        co2eKg: r.summary.total_co2e_kg, eciGrade: r.summary.eci_grade,
        vci: r.summary.operation_vci, certified: r.summary.operation_vci >= 50,
      };
    })
    .sort((a, b) => b.co2eKg - a.co2eKg);
}

// Compliance framing (spec decision: keep all 4 cards, relabelled honestly — no
// fabricated "verified"/"ready" business claims for a demo account).
export type ComplianceState = "audited" | "index" | "not_mapped";
export interface ComplianceCard { name: string; state: ComplianceState; detail: string }

export const PORTAL_COMPLIANCE: ComplianceCard[] = [
  { name: "ISO 14083 / GLEC v3.1", state: "audited",
    detail: "CO₂e is computed to this standard for every certified operation." },
  { name: "Carbon Intensity (ECI)", state: "index",
    detail: "EcoTrace proprietary index — a reading aid, not a regulatory standard." },
  { name: "GHG Protocol · Scope 3.4 / 3.9", state: "not_mapped",
    detail: "Category-level split not yet produced for this account." },
  { name: "CSRD · ESRS E1", state: "not_mapped",
    detail: "E1-6 GHG datapoints not yet mapped for this account." },
];

// Real, generic engine-methodology facts — no claim of live GPS/CAN-bus telemetry,
// since demo-account routes come from EcoTrace's synthetic route generator.
export const PORTAL_PROVENANCE = [
  "Omega (Ω) Engine · physics-informed neural network",
  "Real UK road network · OpenStreetMap",
  "ERA5 weather reanalysis",
  "GLO-30 elevation",
  "Demo account — synthetic route generator, not live GPS",
];

export interface PortalReport { opId: string; label: string; pdf: string; timestamp: string | null }

export function portalReports(records: CertRecord[]): PortalReport[] {
  return records
    .filter((r) => r.pdf)
    .map((r) => ({ opId: r.op_id, label: `Operation ${r.op_id} · Certificate`, pdf: r.pdf!, timestamp: r.anchor.timestamp }))
    .sort((a, b) => (b.timestamp ?? "").localeCompare(a.timestamp ?? ""));
}
