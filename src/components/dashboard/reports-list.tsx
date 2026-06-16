import { Download } from "lucide-react";
import type { ReportItem } from "@/lib/dashboard";

export function ReportsList({ reports }: { reports: ReportItem[] }) {
  return (
    <div className="divide-y rounded-lg border text-sm">
      {reports.map((r) => (
        <div key={r.name} className="flex items-center justify-between px-3 py-2.5">
          <span>{r.name}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {r.format} · {r.date}
            <Download className="size-4 text-accent" aria-hidden />
          </span>
        </div>
      ))}
    </div>
  );
}
