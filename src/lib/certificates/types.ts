// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
export interface CertSummary {
  operation_id: string;
  total_co2e_kg: number;
  interval_Y_kg: number;
  standard: string;
  eci_grade: string | null;
  eci_metric_gco2e_per_tkm: number | null;
  operation_vci: number;
}

export interface CertFacts {
  operator: string | null;
  vehicle: string | null;
  depot: string | null;
  op_type: string | null;
  loaded_segments: number;
  empty_segments: number;
  empty_mileage_ratio: number;
  loaded_tkm: number;
  benchmark: number | null;
  benchmark_version: string | null;
}

export interface CertSku {
  sku_id: number | string;
  co2e_kg: number;
}

export interface CertLeg {
  origin: string;
  dest: string;
  leg_type: string; // "loaded" | "empty_backhaul"
  distance_km: number;
  polyline: [number, number][]; // [lat, lon]
}

export interface CertRecord {
  op_id: string;
  canonical: string; // exact bytes the engine hashed
  sha256: string;
  anchor: { status: "confirmed" | "pending" | "unstamped"; anchored_at: string | null };
  summary: CertSummary;
  // Dashboard fields (piece 3) — optional so the public verify page is unaffected.
  facts?: CertFacts;
  perSku?: CertSku[];
  legs?: CertLeg[];
  pdf?: string;
}
