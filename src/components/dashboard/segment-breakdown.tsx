import type { Segment } from "@/lib/dashboard";

export function SegmentBreakdown({ segments }: { segments: Segment[] }) {
  return (
    <div className="text-sm">
      {segments.map((s) => (
        <div key={s.name} className="mb-2.5">
          <div className="mb-1 flex justify-between">
            <span>{s.name}</span>
            <span className="text-muted-foreground">{s.sharePct}%</span>
          </div>
          <div className="h-1.5 rounded bg-muted">
            <div className="h-1.5 rounded bg-accent" style={{ width: `${s.sharePct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
