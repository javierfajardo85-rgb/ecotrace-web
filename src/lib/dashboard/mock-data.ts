import type { DashboardData } from "./types";

export const mockData: DashboardData = {
  summary: {
    measuredCo2eT: 1247,
    avgFactorCo2eT: 1392,
    avgFactorDeltaPct: 11.6,
    precisionPct: 0.43,
    intensity: 62.4,
    routesAnalysed: 3000,
    anomalies: 3,
  },
  segments: [
    { name: "Standard HGV", sharePct: 48, intensity: 64 },
    { name: "Medium duty", sharePct: 22, intensity: 58 },
    { name: "Eco trailer", sharePct: 18, intensity: 41 },
    { name: "Aged fleet", sharePct: 12, intensity: 79 },
  ],
  compliance: [
    { name: "ISO 14083", status: "verified", detail: "Well-to-wheel GHG quantification · 3,000 / 3,000 routes covered" },
    { name: "GLEC Framework v3", status: "verified", detail: "Aligned default + modelled · primary data 100%" },
    { name: "GHG Protocol · Scope 3.4 / 3.9", status: "ready", detail: "Up- & downstream transport · category-level split" },
    { name: "CSRD · ESRS E1", status: "draft", detail: "E1-6 GHG datapoints mapped · awaiting sign-off" },
  ],
  provenance: [
    "Omega Engine · physics-informed NN",
    "measured ±0.43% (not average factors)",
    "real routes · OpenStreetMap",
    "ERA5 weather",
    "GLO-30 elevation",
    "CAN-bus fuel rate",
  ],
  monthly: [
    { month: "Jan", co2eT: 446 }, { month: "Feb", co2eT: 421 },
    { month: "Mar", co2eT: 438 }, { month: "Apr", co2eT: 410 },
    { month: "May", co2eT: 423 }, { month: "Jun", co2eT: 399 },
  ],
  routeTypeIntensity: [
    { type: "City · high traffic", intensity: 88 },
    { type: "City · low traffic", intensity: 61 },
    { type: "Intercity", intensity: 40 },
  ],
  routes: [
    { id: "r1", origin: "Hull", destination: "Bristol", vehicle: "Aged fleet", km: 363, co2eT: 0.71, intensity: 79, status: "anomaly" },
    { id: "r2", origin: "Heathrow", destination: "Stratford", vehicle: "Standard HGV", km: 31, co2eT: 0.09, intensity: 88, status: "overload" },
    { id: "r3", origin: "Wembley", destination: "Ilford", vehicle: "Medium duty", km: 23, co2eT: 0.06, intensity: 61, status: "ok" },
    { id: "r4", origin: "Birmingham", destination: "London", vehicle: "Standard HGV", km: 192, co2eT: 0.38, intensity: 40, status: "ok" },
  ],
  reports: [
    { name: "Scope 3 transport emissions report", kind: "scope3", format: "PDF", date: "24 Jun 2026" },
    { name: "ISO 14083 methodology statement", kind: "iso", format: "PDF", date: "24 Jun 2026" },
    { name: "CSRD ESRS E1 datapoints", kind: "csrd", format: "CSV · XBRL", date: "24 Jun 2026" },
    { name: "Auditor evidence pack (per-route)", kind: "evidence", format: "ZIP · 41 MB", date: "24 Jun 2026" },
  ],
  vehicles: [
    { id: "HGV-018", segment: "Standard HGV", declaredMassKg: 18000, routes: 412, intensity: 64, status: "ok" },
    { id: "HGV-044", segment: "Aged fleet", declaredMassKg: 18000, routes: 287, intensity: 79, status: "anomaly" },
    { id: "MD-073", segment: "Medium duty", declaredMassKg: 12000, routes: 351, intensity: 58, status: "overload" },
    { id: "ET-110", segment: "Eco trailer", declaredMassKg: 16000, routes: 333, intensity: 41, status: "ok" },
  ],
};
