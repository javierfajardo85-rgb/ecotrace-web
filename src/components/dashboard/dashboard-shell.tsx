import Image from "next/image";
import { SidebarNav } from "./sidebar-nav";
import { ibmPlexSans, ibmPlexMono } from "@/lib/fonts";
import { C, SANS } from "@/lib/certificates/theme";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} mx-auto flex min-h-svh max-w-6xl`}
      style={{ fontFamily: SANS, color: C.ink, background: "#fff" }}
    >
      <aside className="w-52 shrink-0 border-r" style={{ borderColor: C.line, background: C.panel }}>
        <div className="px-4 py-4">
          <Image src="/images/ecotrace-logo.png" alt="EcoTrace" width={120} height={28}
                 style={{ height: 24, width: "auto" }} priority />
        </div>
        <SidebarNav />
      </aside>
      <main className="min-w-0 flex-1 p-6">{children}</main>
    </div>
  );
}
