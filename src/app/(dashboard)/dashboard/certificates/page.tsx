// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Link from "next/link";
import { getAllCertRecords } from "@/lib/certificates";
import { ECIBadge } from "@/components/dashboard/eci-badge";
import { C, MONO } from "@/lib/certificates/theme";

function routeLabel(legs: { origin: string; dest: string }[] | undefined): string {
  if (!legs || !legs.length) return "—";
  return [legs[0].origin, ...legs.map((l) => l.dest)].join(" → ");
}

export default function CertificatesPage() {
  const certs = getAllCertRecords();
  return (
    <div style={{ maxWidth: 920 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: C.navy, margin: 0 }}>
        Certificates
      </h1>
      <p style={{ fontSize: 13, color: C.mut, margin: "6px 0 24px", lineHeight: 1.5 }}>
        ISO 14083 Operation Certificates. CO₂e is ISO 14083 / GLEC; ECI and VCI are proprietary
        EcoTrace indices.
      </p>

      <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr 0.8fr 0.5fr 1fr 0.8fr",
                      gap: 12, padding: "12px 18px", background: C.panel, borderBottom: `1px solid ${C.line2}`,
                      fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mut2 }}>
          <span>Operation</span><span>Route</span><span style={{ textAlign: "right" }}>t CO₂e</span>
          <span style={{ textAlign: "center" }}>ECI</span><span style={{ textAlign: "right" }}>VCI</span>
          <span style={{ textAlign: "right" }}>Anchor</span>
        </div>
        {certs.map((c, i) => {
          const certified = c.summary.operation_vci >= 50;
          return (
            <Link key={c.op_id} href={`/dashboard/certificates/${c.op_id}`}
              style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr 0.8fr 0.5fr 1fr 0.8fr",
                       gap: 12, padding: "14px 18px", alignItems: "center",
                       borderTop: i ? `1px solid ${C.line2}` : "none", color: C.ink, textDecoration: "none" }}>
              <span style={{ fontFamily: MONO, fontSize: 12.5, color: C.navy }}>{c.op_id}</span>
              <span style={{ fontSize: 13, color: C.mut, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {routeLabel(c.legs)}
              </span>
              <span style={{ textAlign: "right", fontFamily: MONO, fontSize: 13 }}>
                {(c.summary.total_co2e_kg / 1000).toFixed(2)}
              </span>
              <span style={{ display: "flex", justifyContent: "center" }}><ECIBadge grade={c.summary.eci_grade} size={22} /></span>
              <span style={{ textAlign: "right", fontSize: 12.5, fontWeight: 600, color: certified ? C.green : C.red }}>
                {c.summary.operation_vci.toFixed(1)}% · {certified ? "Certified" : "REJECTED"}
              </span>
              <span style={{ textAlign: "right", fontSize: 12, color: C.mut2, textTransform: "capitalize" }}>
                {c.anchor.status}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
