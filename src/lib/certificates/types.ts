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

export interface CertRecord {
  op_id: string;
  canonical: string; // exact bytes the engine hashed
  sha256: string;
  anchor: { status: "confirmed" | "pending" | "unstamped"; anchored_at: string | null };
  summary: CertSummary;
}
