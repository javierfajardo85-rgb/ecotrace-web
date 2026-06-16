import { StatusBadge } from "./status-badge";
import type { RouteRow } from "@/lib/dashboard";

export function RoutesTable({ routes }: { routes: RouteRow[] }) {
  return (
    <div className="rounded-lg border text-sm overflow-x-auto">
      <div className="grid grid-cols-[1.7fr_1fr_0.6fr_0.7fr_0.8fr] gap-2 bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <span>Route</span><span>Vehicle</span><span className="text-right">km</span><span className="text-right">t CO₂e</span><span className="text-right">Status</span>
      </div>
      {routes.map((r) => (
        <div key={r.id} className="grid grid-cols-[1.7fr_1fr_0.6fr_0.7fr_0.8fr] gap-2 border-t px-3 py-2">
          <span>{r.origin} → {r.destination}</span>
          <span className="text-muted-foreground">{r.vehicle}</span>
          <span className="text-right">{r.km}</span>
          <span className="text-right">{r.co2eT}</span>
          <span className="text-right"><StatusBadge status={r.status} /></span>
        </div>
      ))}
    </div>
  );
}
