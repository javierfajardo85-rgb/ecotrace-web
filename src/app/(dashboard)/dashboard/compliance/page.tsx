import { getDashboardData } from "@/lib/dashboard";
import { ComplianceCards } from "@/components/dashboard/compliance-cards";
import { ProvenancePanel } from "@/components/dashboard/provenance-panel";
import { ReportsList } from "@/components/dashboard/reports-list";

export default function CompliancePage() {
  const { compliance, provenance, reports } = getDashboardData();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Compliance & reporting</h1>
        <span className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-foreground">Assurance-ready</span>
      </div>
      <ComplianceCards frameworks={compliance} />
      <ProvenancePanel items={provenance} />
      <div>
        <div className="mb-2 text-sm font-medium">Auditable reports</div>
        <ReportsList reports={reports} />
      </div>
    </div>
  );
}
