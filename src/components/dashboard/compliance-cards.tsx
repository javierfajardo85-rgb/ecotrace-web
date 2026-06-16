import type { ComplianceFramework, ComplianceStatus } from "@/lib/dashboard";

const statusText: Record<ComplianceStatus, string> = { verified: "Verified", ready: "Ready", draft: "Draft" };
const statusClass: Record<ComplianceStatus, string> = {
  verified: "text-accent-foreground", ready: "text-accent-foreground", draft: "text-amber-700",
};

export function ComplianceCards({ frameworks }: { frameworks: ComplianceFramework[] }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {frameworks.map((f) => (
        <div key={f.name} className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{f.name}</span>
            <span className={`text-xs ${statusClass[f.status]}`}>{statusText[f.status]}</span>
          </div>
          <div className="mt-1.5 text-xs text-muted-foreground">{f.detail}</div>
        </div>
      ))}
    </div>
  );
}
