// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Image from "next/image";
import { signIn } from "@/lib/auth";
import { C } from "@/lib/certificates/theme";

export default function PortalLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  async function doLogin(formData: FormData) {
    "use server";
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/portal",
    });
  }
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: C.stage }}>
      <form
        action={doLogin}
        style={{
          background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 32,
          width: 340, display: "flex", flexDirection: "column", gap: 14,
        }}
      >
        <Image src="/images/ecotrace-symbol.png" alt="" width={32} height={32} style={{ height: 28, width: "auto" }} />
        <h1 style={{ color: C.navy, fontSize: 18, margin: 0 }}>Client portal</h1>
        <p style={{ color: C.mut, fontSize: 12.5, margin: 0 }}>Sign in to see your certified operations.</p>
        <input name="email" type="email" placeholder="email" required
          style={{ padding: 10, border: `1px solid ${C.line}`, borderRadius: 8 }} />
        <input name="password" type="password" placeholder="password" required
          style={{ padding: 10, border: `1px solid ${C.line}`, borderRadius: 8 }} />
        <button style={{ padding: 10, background: C.navy, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600 }}>
          Sign in
        </button>
      </form>
    </div>
  );
}
