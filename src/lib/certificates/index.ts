// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import type { CertRecord } from "./types";
import { op0000 } from "./op0000";
import { op0001 } from "./op0001";
import { op1000 } from "./op1000";
import { op1001 } from "./op1001";
import { op1002 } from "./op1002";
import { op1003 } from "./op1003";
import { op1004 } from "./op1004";
import { op1005 } from "./op1005";
import { op1006 } from "./op1006";
import { op1007 } from "./op1007";
import { op1008 } from "./op1008";
import { op1009 } from "./op1009";
import { op1010 } from "./op1010";
import { op1011 } from "./op1011";
import { op1012 } from "./op1012";
import { op1013 } from "./op1013";
import { op1014 } from "./op1014";
import { op1015 } from "./op1015";
import { op1016 } from "./op1016";
import { op1017 } from "./op1017";
import { op1018 } from "./op1018";
import { op1019 } from "./op1019";

const REGISTRY: Record<string, CertRecord> = {
  op0000, op0001,
  op1000, op1001, op1002, op1003, op1004, op1005, op1006, op1007, op1008, op1009,
  op1010, op1011, op1012, op1013, op1014, op1015, op1016, op1017, op1018, op1019,
};

export function getCertRecord(id: string): CertRecord | null {
  return REGISTRY[id] ?? null;
}

export function getAllCertRecords(): CertRecord[] {
  return Object.values(REGISTRY);
}

export function getCertRecordsForClient(clientName: string): CertRecord[] {
  return Object.values(REGISTRY).filter((r) => r.facts?.operator === clientName);
}

export type { CertRecord } from "./types";
