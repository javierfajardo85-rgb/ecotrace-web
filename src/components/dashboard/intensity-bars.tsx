import type { RouteTypeIntensity } from "@/lib/dashboard";

export function IntensityBars({ data }: { data: RouteTypeIntensity[] }) {
  const max = Math.max(...data.map((d) => d.intensity), 1);
  return (
    <div className="text-sm">
      {data.map((d) => (
        <div key={d.type} className="mb-2 flex items-center gap-2">
          <span className="w-32 shrink-0">{d.type}</span>
          <div className="h-3.5 flex-1 rounded bg-muted">
            <div className="h-3.5 rounded bg-accent" style={{ width: `${Math.round((d.intensity / max) * 100)}%` }} />
          </div>
          <span className="w-8 text-right text-muted-foreground">{d.intensity}</span>
        </div>
      ))}
    </div>
  );
}
