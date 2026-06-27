// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import type { CertRecord } from "./types";
import { op0000 } from "./op0000";
import { op0001 } from "./op0001";

const REGISTRY: Record<string, CertRecord> = { op0000, op0001 };

export function getCertRecord(id: string): CertRecord | null {
  return REGISTRY[id] ?? null;
}
