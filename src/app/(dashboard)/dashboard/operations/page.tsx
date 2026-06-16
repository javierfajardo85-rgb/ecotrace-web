import { getDashboardData } from "@/lib/dashboard";
import { MetricCard } from "@/components/dashboard/metric-card";
import { IntensityBars } from "@/components/dashboard/intensity-bars";
import { RoutesTable } from "@/components/dashboard/routes-table";

export default function OperationsPage() {
  const { summary, routeTypeIntensity, routes } = getDashboardData();
  const overloads = routes.filter((r) => r.status === "overload").length;
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Operations</h1>
      <div className="grid grid-cols-3 gap-2">
        <MetricCard label="Routes analysed" value={summary.routesAnalysed.toLocaleString()} />
        <MetricCard label="Avg intensity" value={String(summary.intensity)} unit="gCO₂e/t·km" />
        <MetricCard label="Flagged" value={`${summary.anomalies} + ${overloads}`} unit="flags" />
      </div>
      <div className="rounded-lg border p-3">
        <div className="mb-2.5 text-xs text-muted-foreground">Intensity by route type (gCO₂e/t·km)</div>
        <IntensityBars data={routeTypeIntensity} />
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">Highest-intensity routes</div>
        <RoutesTable routes={routes} />
      </div>
    </div>
  );
}
