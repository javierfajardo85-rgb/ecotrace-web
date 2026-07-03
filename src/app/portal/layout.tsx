// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Image from "next/image";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { auth, signOut } from "@/lib/auth";
import { C } from "@/lib/certificates/theme";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-ibm-plex-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ibm-plex-mono" });

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const clientName = (session?.user as any)?.clientName as string | undefined;

  return (
    <div className={`${sans.variable} ${mono.variable}`} style={{ fontFamily: "var(--font-ibm-plex-sans)", color: C.ink, minHeight: "100vh", background: C.stage }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px", background: "#fff", borderBottom: `1px solid ${C.line}` }}>
        <Image src="/images/ecotrace-logo.png" alt="EcoTrace" width={130} height={26} style={{ height: 24, width: "auto" }} priority />
        {clientName && (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: C.mut }}>{clientName}</span>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/portal/login" }); }}>
              <button style={{ fontSize: 12.5, color: C.navy, background: "none", border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>
                Sign out
              </button>
            </form>
          </div>
        )}
      </header>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "28px 20px" }}>{children}</main>
      <footer style={{ textAlign: "center", padding: "20px", fontSize: 11, color: C.mut2 }}>
        EcoTrace Green Technologies Ltd · Company No. 17180344 — CONFIDENTIAL
      </footer>
    </div>
  );
}
