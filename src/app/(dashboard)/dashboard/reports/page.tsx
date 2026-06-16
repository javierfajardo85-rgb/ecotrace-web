import { getDashboardData } from "@/lib/dashboard";
import { ReportsList } from "@/components/dashboard/reports-list";

export default function ReportsPage() {
  const { reports } = getDashboardData();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Reports</h1>
        <button className="rounded-md border border-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
          Generate report
        </button>
      </div>
      <ReportsList reports={reports} />
    </div>
  );
}
