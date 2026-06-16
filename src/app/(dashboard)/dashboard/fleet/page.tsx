import { getDashboardData } from "@/lib/dashboard";
import { StatusBadge } from "@/components/dashboard/status-badge";

export default function FleetPage() {
  const { vehicles } = getDashboardData();
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Fleet & routes</h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr]">
        <div className="overflow-hidden rounded-lg border text-sm">
          <div className="grid grid-cols-[1fr_1fr_0.7fr_0.7fr] gap-2 bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
            <span>Vehicle</span><span>Segment</span><span className="text-right">Intensity</span><span className="text-right">Status</span>
          </div>
          {vehicles.map((v) => (
            <div key={v.id} className="grid grid-cols-[1fr_1fr_0.7fr_0.7fr] gap-2 border-t px-3 py-2">
              <span>{v.id}</span>
              <span className="text-muted-foreground">{v.segment}</span>
              <span className="text-right">{v.intensity}</span>
              <span className="text-right"><StatusBadge status={v.status} /></span>
            </div>
          ))}
        </div>
        <div className="flex min-h-56 items-center justify-center rounded-lg border bg-muted/30 text-sm text-muted-foreground">
          Route map
        </div>
      </div>
    </div>
  );
}
