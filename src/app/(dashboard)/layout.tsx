import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

// Defence-in-depth: even behind the password gate, never index the dashboard.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
