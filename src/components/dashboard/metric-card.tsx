export function MetricCard({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-md bg-muted/50 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-medium">
        {value}
        {unit ? <span className="ml-1 text-xs text-muted-foreground">{unit}</span> : null}
      </div>
    </div>
  );
}
