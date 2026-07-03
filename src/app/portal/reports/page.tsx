// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import { requireClientSession } from "@/lib/portal-auth";
import { getCertRecordsForClient } from "@/lib/certificates";
import { portalReports } from "@/lib/portal/aggregate";
import { C } from "@/lib/certificates/theme";

export default async function PortalReports() {
  const clientName = await requireClientSession();
  const records = getCertRecordsForClient(clientName);
  const reports = portalReports(records);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: C.navy, margin: 0 }}>Reports</h1>
      <p style={{ fontSize: 12.5, color: C.mut2, margin: 0 }}>
        One audit-ready PDF certificate per certified operation — CO₂e figure, ECI/VCI explained, trust &amp; verification block.
      </p>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        {reports.map((r, i) => (
          <a key={r.opId} href={`/certificates/${r.pdf}`} style={{ display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "12px 16px", borderTop: i ? `1px solid ${C.line2}` : "none",
            fontSize: 13, color: C.ink, textDecoration: "none" }}>
            <span>{r.label}</span>
            <span style={{ fontSize: 11.5, color: C.mut2 }}>PDF · {r.timestamp ? r.timestamp.slice(0, 10) : "—"} ↓</span>
          </a>
        ))}
        {!reports.length && <div style={{ padding: 24, color: C.mut2 }}>No reports yet.</div>}
      </div>
    </div>
  );
}
