import { getDashboardData } from "@/lib/dashboard";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Co2eTrendChart } from "@/components/dashboard/co2e-trend-chart";
import { SegmentBreakdown } from "@/components/dashboard/segment-breakdown";

export default function OverviewPage() {
  const { summary, segments, monthly, compliance } = getDashboardData();
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xs text-muted-foreground">Measured CO₂e · fleet total</div>
          <div className="text-3xl font-medium">
            {summary.measuredCo2eT.toLocaleString()} <span className="text-base text-muted-foreground">t CO₂e</span>
          </div>
        </div>
        <div className="text-right">
          <span className="rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent-foreground">
            measured ±{summary.precisionPct}%
          </span>
          <div className="mt-1.5 text-xs text-muted-foreground">
            Average factors would report{" "}
            <span className="font-medium text-foreground">{summary.avgFactorCo2eT.toLocaleString()} t</span>{" "}
            <span className="text-red-700">(+{summary.avgFactorDeltaPct}%)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <MetricCard label="Intensity" value={String(summary.intensity)} unit="gCO₂e/t·km" />
        <MetricCard label="Data precision" value={`±${summary.precisionPct}%`} />
        <MetricCard label="Coverage" value={summary.routesAnalysed.toLocaleString()} unit="routes" />
        <MetricCard label="Anomalies" value={String(summary.anomalies)} unit="flagged" />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="mr-1 text-muted-foreground">Compliance:</span>
        {compliance.map((c) => (
          <span key={c.name} className="rounded-full border border-accent/30 px-2 py-0.5 text-accent-foreground">
            ✓ {c.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border p-3">
          <div className="mb-2 text-xs text-muted-foreground">Monthly CO₂e (t)</div>
          <Co2eTrendChart data={monthly} />
        </div>
        <div className="rounded-lg border p-3">
          <div className="mb-2.5 text-xs text-muted-foreground">By fleet segment</div>
          <SegmentBreakdown segments={segments} />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="rounded-md border border-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
          Download audit report (PDF)
        </button>
      </div>
    </div>
  );
}
