export function ProvenancePanel({ items }: { items: string[] }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <div className="mb-2 text-sm font-medium">Methodology & data provenance</div>
      <div className="flex flex-wrap gap-1.5 text-xs">
        {items.map((i) => (
          <span key={i} className="rounded-full border bg-background px-2 py-0.5">{i}</span>
        ))}
      </div>
    </div>
  );
}
