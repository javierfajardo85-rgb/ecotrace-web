export type RouteStatus = "ok" | "anomaly" | "overload";
export type ComplianceStatus = "verified" | "ready" | "draft";

export interface FleetSummary {
  measuredCo2eT: number;
  avgFactorCo2eT: number;
  avgFactorDeltaPct: number;
  precisionPct: number;
  intensity: number;
  routesAnalysed: number;
  anomalies: number;
}
export interface Segment { name: string; sharePct: number; intensity: number; }
export interface ComplianceFramework { name: string; status: ComplianceStatus; detail: string; }
export interface MonthlyPoint { month: string; co2eT: number; }
export interface RouteRow {
  id: string; origin: string; destination: string; vehicle: string;
  km: number; co2eT: number; intensity: number; status: RouteStatus;
}
export interface RouteTypeIntensity { type: string; intensity: number; }
export interface ReportItem { name: string; kind: string; format: string; date: string; }
export interface Vehicle {
  id: string; segment: string; declaredMassKg: number; routes: number;
  intensity: number; status: RouteStatus;
}
export interface DashboardData {
  summary: FleetSummary;
  segments: Segment[];
  compliance: ComplianceFramework[];
  provenance: string[];
  monthly: MonthlyPoint[];
  routeTypeIntensity: RouteTypeIntensity[];
  routes: RouteRow[];
  reports: ReportItem[];
  vehicles: Vehicle[];
}
