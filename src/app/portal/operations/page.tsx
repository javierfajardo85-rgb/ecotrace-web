// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Link from "next/link";
import { requireClientSession } from "@/lib/portal-auth";
import { getCertRecordsForClient } from "@/lib/certificates";
import { portalSummary, vehicleSegments, portalRoutes } from "@/lib/portal/aggregate";
import { ECIBadge } from "@/components/dashboard/eci-badge";
import { C, MONO } from "@/lib/certificates/theme";

export default async function PortalOperations() {
  const clientName = await requireClientSession();
  const records = getCertRecordsForClient(clientName);
  const s = portalSummary(records);
  const segments = vehicleSegments(records);
  const routes = portalRoutes(records);
  const maxIntensity = Math.max(...segments.map((d) => d.avgIntensity ?? 0), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: C.navy, margin: 0 }}>Operations</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        <div style={{ background: C.panel, borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 10.5, color: C.mut2 }}>Operations analysed</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: C.navy, marginTop: 3 }}>{s.opsCount}</div>
        </div>
        <div style={{ background: C.panel, borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 10.5, color: C.mut2 }}>Avg intensity</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: C.navy, marginTop: 3 }}>
            {s.avgIntensity != null ? s.avgIntensity.toFixed(1) : "—"} <span style={{ fontSize: 10.5, fontWeight: 400, color: C.mut2 }}>gCO₂e/t·km</span>
          </div>
        </div>
        <div style={{ background: C.panel, borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 10.5, color: C.mut2 }}>Certified</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: C.navy, marginTop: 3 }}>{s.certifiedCount}/{s.opsCount}</div>
        </div>
      </div>

      <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: C.mut2, marginBottom: 12 }}>
          Intensity by vehicle type (gCO₂e/t·km)
        </div>
        {segments.map((d) => (
          <div key={d.vehicle} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 13 }}>
            <span style={{ width: 120, flexShrink: 0 }}>{d.vehicle}</span>
            <div style={{ flex: 1, height: 14, borderRadius: 4, background: C.line2 }}>
              <div style={{ width: `${Math.round(((d.avgIntensity ?? 0) / maxIntensity) * 100)}%`, height: "100%", borderRadius: 4, background: C.green }} />
            </div>
            <span style={{ width: 40, textAlign: "right", color: C.mut2, fontFamily: MONO }}>{d.avgIntensity ?? "—"}</span>
          </div>
        ))}
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>All operations</div>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr 1fr 0.8fr 0.5fr 0.8fr", gap: 12, padding: "10px 16px",
            background: C.panel, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mut2 }}>
            <span>Operation</span><span>Route</span><span>Vehicle</span><span style={{ textAlign: "right" }}>t CO₂e</span>
            <span style={{ textAlign: "center" }}>ECI</span><span style={{ textAlign: "right" }}>Status</span>
          </div>
          {routes.map((r, i) => (
            <Link key={r.opId} href={`/portal/${r.opId}`} style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr 1fr 0.8fr 0.5fr 0.8fr",
              gap: 12, padding: "12px 16px", alignItems: "center", borderTop: i ? `1px solid ${C.line2}` : "none",
              color: C.ink, textDecoration: "none", fontSize: 13 }}>
              <span style={{ fontFamily: MONO, fontSize: 12.5, color: C.navy }}>{r.opId}</span>
              <span style={{ color: C.mut, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.route}</span>
              <span style={{ color: C.mut }}>{r.vehicle}</span>
              <span style={{ textAlign: "right", fontFamily: MONO }}>{(r.co2eKg / 1000).toFixed(2)}</span>
              <span style={{ display: "flex", justifyContent: "center" }}><ECIBadge grade={r.eciGrade} size={20} /></span>
              <span style={{ textAlign: "right", fontWeight: 600, color: r.certified ? C.green : C.red }}>
                {r.certified ? "Certified" : "Rejected"}
              </span>
            </Link>
          ))}
          {!routes.length && <div style={{ padding: 24, color: C.mut2 }}>No operations yet.</div>}
        </div>
      </div>
    </div>
  );
}
