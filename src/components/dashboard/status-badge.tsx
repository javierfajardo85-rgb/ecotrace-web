import { cn } from "@/lib/utils";
import type { RouteStatus } from "@/lib/dashboard";

const styles: Record<RouteStatus, string> = {
  ok: "bg-accent/10 text-accent-foreground",
  anomaly: "bg-amber-100 text-amber-800",
  overload: "bg-red-100 text-red-800",
};
const labels: Record<RouteStatus, string> = { ok: "OK", anomaly: "Anomaly", overload: "Overload" };

export function StatusBadge({ status }: { status: RouteStatus }) {
  return (
    <span className={cn("inline-block rounded-full px-2 py-0.5 text-xs", styles[status])}>
      {labels[status]}
    </span>
  );
}
