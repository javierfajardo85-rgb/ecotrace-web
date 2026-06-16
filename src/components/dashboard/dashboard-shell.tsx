import { SidebarNav } from "./sidebar-nav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl">
      <aside className="w-52 shrink-0 border-r bg-muted/30">
        <div className="flex items-center gap-2 px-4 py-3 font-medium">
          <span className="size-2.5 rounded-full bg-accent" /> EcoTrace
        </div>
        <SidebarNav />
      </aside>
      <main className="min-w-0 flex-1 p-6">{children}</main>
    </div>
  );
}
