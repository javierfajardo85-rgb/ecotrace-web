// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import { requireClientSession } from "@/lib/portal-auth";
import { getCertRecordsForClient } from "@/lib/certificates";
import { PORTAL_COMPLIANCE, PORTAL_PROVENANCE, portalReports } from "@/lib/portal/aggregate";
import { C } from "@/lib/certificates/theme";

const stateText: Record<string, string> = { audited: "Audited", index: "EcoTrace index", not_mapped: "Not yet mapped" };
const stateColor: Record<string, string> = { audited: C.green, index: C.mut, not_mapped: C.amber };

export default async function PortalCompliance() {
  const clientName = await requireClientSession();
  const records = getCertRecordsForClient(clientName);
  const reports = portalReports(records);
  const card: React.CSSProperties = { border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: C.navy, margin: 0 }}>Compliance &amp; reporting</h1>
      <p style={{ fontSize: 12.5, color: C.mut2, margin: 0 }}>
        CO₂e is computed to ISO 14083 / GLEC (an audited standard). ECI and VCI are proprietary EcoTrace indices, provided as reading aids — they are not regulatory standards.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {PORTAL_COMPLIANCE.map((c) => (
          <div key={c.name} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{c.name}</span>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: stateColor[c.state] }}>{stateText[c.state]}</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: C.mut }}>{c.detail}</div>
          </div>
        ))}
      </div>

      <div style={{ ...card, background: C.panel }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Methodology &amp; data provenance</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {PORTAL_PROVENANCE.map((p) => (
            <span key={p} style={{ borderRadius: 999, border: `1px solid ${C.line}`, background: "#fff", padding: "4px 10px", fontSize: 11.5 }}>
              {p}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Auditable certificates (PDF)</div>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
          {reports.map((r, i) => (
            <a key={r.opId} href={`/certificates/${r.pdf}`} style={{ display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "12px 16px", borderTop: i ? `1px solid ${C.line2}` : "none",
              fontSize: 13, color: C.ink, textDecoration: "none" }}>
              <span>{r.label}</span>
              <span style={{ fontSize: 11.5, color: C.mut2 }}>PDF · {r.timestamp ? r.timestamp.slice(0, 10) : "—"} ↓</span>
            </a>
          ))}
          {!reports.length && <div style={{ padding: 24, color: C.mut2 }}>No certificates yet.</div>}
        </div>
      </div>
    </div>
  );
}
