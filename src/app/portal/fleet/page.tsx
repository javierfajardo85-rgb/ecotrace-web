// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import { requireClientSession } from "@/lib/portal-auth";
import { getCertRecordsForClient } from "@/lib/certificates";
import { vehicleSegments } from "@/lib/portal/aggregate";
import { MapSection } from "@/components/dashboard/map-section";
import { C, MONO } from "@/lib/certificates/theme";

export default async function PortalFleet() {
  const clientName = await requireClientSession();
  const records = getCertRecordsForClient(clientName);
  const segments = vehicleSegments(records);
  const allLegs = records.flatMap((r) => r.legs ?? []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: C.navy, margin: 0 }}>Fleet &amp; routes</h1>

      <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: C.mut2, marginBottom: 12 }}>
          All certified routes
        </div>
        <MapSection legs={allLegs} />
        <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11, color: C.mut2 }}>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: C.green }} /> loaded</span>
          <span><span style={{ display: "inline-block", width: 12, height: 2, verticalAlign: "middle", background: C.mut2 }} /> empty backhaul</span>
        </div>
      </div>

      <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 0.7fr 0.7fr", gap: 12, padding: "10px 16px",
          background: C.panel, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mut2 }}>
          <span>Vehicle type</span><span style={{ textAlign: "right" }}>Operations</span><span style={{ textAlign: "right" }}>Avg intensity</span>
        </div>
        {segments.map((s, i) => (
          <div key={s.vehicle} style={{ display: "grid", gridTemplateColumns: "1fr 0.7fr 0.7fr", gap: 12, padding: "12px 16px",
            borderTop: i ? `1px solid ${C.line2}` : "none", fontSize: 13 }}>
            <span>{s.vehicle}</span>
            <span style={{ textAlign: "right", fontFamily: MONO }}>{s.count}</span>
            <span style={{ textAlign: "right", fontFamily: MONO, color: C.mut2 }}>{s.avgIntensity ?? "—"} gCO₂e/t·km</span>
          </div>
        ))}
        {!segments.length && <div style={{ padding: 24, color: C.mut2 }}>No vehicles yet.</div>}
      </div>
    </div>
  );
}
