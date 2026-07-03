// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Image from "next/image";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { auth, signOut } from "@/lib/auth";
import { PortalSidebarNav } from "@/components/portal/portal-sidebar-nav";
import { C } from "@/lib/certificates/theme";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-ibm-plex-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ibm-plex-mono" });

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const clientName = (session?.user as any)?.clientName as string | undefined;

  // Unauthenticated (login page itself) — no shell, just the page content.
  if (!clientName) {
    return <div className={`${sans.variable} ${mono.variable}`} style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>{children}</div>;
  }

  return (
    <div className={`${sans.variable} ${mono.variable}`} style={{ fontFamily: "var(--font-ibm-plex-sans)", color: C.ink,
      display: "flex", minHeight: "100vh", background: "#fff" }}>
      <aside style={{ width: 208, shrink: 0, borderRight: `1px solid ${C.line}`, background: C.panel } as React.CSSProperties}>
        <div style={{ padding: 16 }}>
          <Image src="/images/ecotrace-logo.png" alt="EcoTrace" width={130} height={26} style={{ height: 22, width: "auto" }} priority />
        </div>
        <PortalSidebarNav />
        <div style={{ marginTop: "auto", padding: 16, borderTop: `1px solid ${C.line}` }}>
          <div style={{ fontSize: 12, color: C.mut, marginBottom: 8 }}>{clientName}</div>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/portal/login" }); }}>
            <button style={{ fontSize: 12, color: C.navy, background: "none", border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", width: "100%" }}>
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <main style={{ flex: 1, maxWidth: 960, margin: "0 auto", padding: "28px 24px", width: "100%" }}>{children}</main>
        <footer style={{ textAlign: "center", padding: "16px", fontSize: 11, color: C.mut2 }}>
          EcoTrace Green Technologies Ltd · Company No. 17180344 — CONFIDENTIAL
        </footer>
      </div>
    </div>
  );
}
