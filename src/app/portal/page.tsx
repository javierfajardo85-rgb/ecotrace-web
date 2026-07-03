// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import { requireClientSession } from "@/lib/portal-auth";
import { getCertRecordsForClient } from "@/lib/certificates";
import { portalSummary, vehicleSegments, PORTAL_COMPLIANCE } from "@/lib/portal/aggregate";
import { C, MONO } from "@/lib/certificates/theme";

const stateText: Record<string, string> = { audited: "Audited", index: "EcoTrace index", not_mapped: "Not yet mapped" };
const stateColor: Record<string, string> = { audited: C.green, index: C.mut, not_mapped: C.amber };

export default async function PortalOverview() {
  const clientName = await requireClientSession();
  const records = getCertRecordsForClient(clientName);
  const s = portalSummary(records);
  const segments = vehicleSegments(records);
  const card: React.CSSProperties = { border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: C.navy, margin: 0 }}>{clientName}</h1>
        <p style={{ fontSize: 12.5, color: C.mut2, margin: "4px 0 0" }}>
          Demo account — the underlying routes are EcoTrace&apos;s synthetic route generator (real UK terrain &amp; weather), not live GPS traces. Every figure below is computed from your {s.opsCount} certified operations.
        </p>
      </div>

      {/* hero */}
      <div style={{ ...card, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: C.mut2 }}>
            Measured CO₂e · all operations
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em", color: C.navy, marginTop: 8 }}>
            {(s.measuredCo2eKg / 1000).toFixed(2)} <span style={{ fontSize: 16, fontWeight: 500, color: C.green }}>t CO₂e</span>
          </div>
          <div style={{ fontSize: 12.5, color: C.mut, marginTop: 6 }}>Audited to ISO 14083 / GLEC v3.1 · Omega (Ω) Engine</div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", border: "1px solid #cfe6da",
          background: "#f1f8f4", borderRadius: 999 }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: C.green }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.green }}>{s.certifiedPct}% certified</span>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        <Metric label="Operations" value={String(s.opsCount)} />
        <Metric label="Avg intensity" value={s.avgIntensity != null ? s.avgIntensity.toFixed(1) : "—"} unit="gCO₂e/t·km" />
        <Metric label="Certified" value={`${s.certifiedCount}/${s.opsCount}`} />
        <Metric label="Last certified" value={s.latestCertifiedAt ? s.latestCertifiedAt.slice(0, 10) : "—"} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        <span style={{ fontSize: 11.5, color: C.mut2, marginRight: 4 }}>Standards:</span>
        {PORTAL_COMPLIANCE.map((c) => (
          <span key={c.name} title={c.detail} style={{ borderRadius: 999, border: `1px solid ${C.line}`, padding: "3px 10px",
            fontSize: 11.5, color: stateColor[c.state] }}>
            {c.name} · {stateText[c.state]}
          </span>
        ))}
      </div>

      <div style={card}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: C.mut2, marginBottom: 12 }}>
          By vehicle type
        </div>
        {segments.map((seg) => (
          <div key={seg.vehicle} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
              <span>{seg.vehicle}</span>
              <span style={{ color: C.mut2, fontFamily: MONO }}>{seg.count} op{seg.count === 1 ? "" : "s"} · {seg.sharePct}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 4, background: C.line2 }}>
              <div style={{ width: `${seg.sharePct}%`, height: "100%", borderRadius: 4, background: C.green }} />
            </div>
          </div>
        ))}
        {!segments.length && <div style={{ color: C.mut2, fontSize: 13 }}>No operations yet.</div>}
      </div>
    </div>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div style={{ background: C.panel, borderRadius: 10, padding: 12 }}>
      <div style={{ fontSize: 10.5, color: C.mut2 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 600, color: C.navy, marginTop: 3 }}>
        {value}{unit && <span style={{ fontSize: 10.5, fontWeight: 400, color: C.mut2, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );
}
