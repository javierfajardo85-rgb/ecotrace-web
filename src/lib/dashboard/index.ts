import { mockData } from "./mock-data";
import type { DashboardData } from "./types";

// Single seam: swap mockData for an API call when wiring live data.
export function getDashboardData(): DashboardData {
  return mockData;
}
export * from "./types";
