// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCertRecord } from "@/lib/certificates";
import { MapSection } from "@/components/dashboard/map-section";
import { C, MONO, GRADE_COLOURS } from "@/lib/certificates/theme";

const VERIFY_BASE = "https://verify.ecotracegreen.com";
const GRADES = ["A", "B", "C", "D", "E", "F", "G"];

export default async function CertificateDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCertRecord(id);
  if (!c) notFound();

  const s = c.summary;
  const f = c.facts;
  const certified = s.operation_vci >= 50;
  const grade = s.eci_grade;
  const verifyUrl = `${VERIFY_BASE}/cert/${c.op_id}?h=${c.sha256}`;
  const card: React.CSSProperties = { border: `1px solid ${C.line}`, borderRadius: 12, padding: 20 };
  const sectionLbl: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.13em",
    textTransform: "uppercase", color: C.mut2, marginBottom: 12 };

  return (
    <div style={{ maxWidth: 820, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* masthead */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.navy }}>
          Carbon Footprint Certificate
        </div>
        <Link href="/dashboard/certificates" style={{ fontSize: 12, color: C.mut2, textDecoration: "none" }}>
          ← All certificates
        </Link>
      </div>

      {/* hero */}
      <div style={{ ...card, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: C.mut2 }}>
            Operation carbon footprint
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 12 }}>
            <span style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 0.9, color: C.navy }}>
              {s.total_co2e_kg.toFixed(2)}
            </span>
            <span style={{ fontSize: 18, fontWeight: 500, color: C.mut }}>± {s.interval_Y_kg.toFixed(2)}</span>
            <span style={{ fontSize: 16, fontWeight: 500, color: C.green }}>kgCO₂e</span>
          </div>
          <div style={{ fontSize: 12.5, color: C.mut, marginTop: 10 }}>
            Audited to {s.standard} · Omega (Ω) Engine mass allocation
          </div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px",
          border: `1px solid ${certified ? "#cfe6da" : "#e8c9c5"}`, background: certified ? "#f1f8f4" : "#fcf4f3",
          borderRadius: 999 }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: certified ? C.green : C.red }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: certified ? C.green : C.red }}>
            {certified ? "Certified" : "Rejected"}
          </span>
        </span>
      </div>

      {/* ECI + VCI */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* ECI */}
        <div style={{ ...card, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Carbon intensity</span>
            <span style={{ fontFamily: MONO, fontSize: 10, color: C.mut2, border: `1px solid ${C.line}`, borderRadius: 5, padding: "2px 6px" }}>ECI</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 600, color: C.navy }}>
                {s.eci_metric_gco2e_per_tkm != null ? s.eci_metric_gco2e_per_tkm.toFixed(1) : "N/A"}
              </span>
              <span style={{ fontSize: 12, color: C.mut }}>gCO₂e/tkm</span>
            </div>
            {grade && grade !== "N/A" && (
              <span style={{ width: 44, height: 44, borderRadius: 9, background: GRADE_COLOURS[grade] ?? "#999",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>
                {grade}
              </span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {GRADES.map((g) => (
                <span key={g} style={{ flex: 1, height: 7, borderRadius: 2, background: GRADE_COLOURS[g],
                  opacity: g === grade ? 1 : 0.3, boxShadow: g === grade ? "0 0 0 2px rgba(0,0,0,.10)" : "none" }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {GRADES.map((g) => (
                <span key={g} style={{ flex: 1, textAlign: "center", fontFamily: MONO, fontSize: 9,
                  fontWeight: g === grade ? 600 : 400, color: g === grade ? (GRADE_COLOURS[grade!] ?? C.mut3) : C.mut3 }}>{g}</span>
              ))}
            </div>
          </div>
          <span style={{ fontSize: 11, color: C.mut2, lineHeight: 1.45 }}>EcoTrace index — not a regulatory standard.</span>
        </div>

        {/* VCI */}
        <div style={{ ...card, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Veracity</span>
            <span style={{ fontFamily: MONO, fontSize: 10, color: C.mut2, border: `1px solid ${C.line}`, borderRadius: 5, padding: "2px 6px" }}>VCI</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 600, color: C.navy }}>{s.operation_vci.toFixed(1)}</span>
              <span style={{ fontSize: 18, fontWeight: 500, color: C.mut }}>%</span>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 11px", borderRadius: 999,
              background: certified ? "#f1f8f4" : "#fcf4f3", border: `1px solid ${certified ? "#cfe6da" : "#e8c9c5"}` }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: certified ? C.green : C.red }}>
                {certified ? "Certified" : "REJECTED"}
              </span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, paddingTop: 13 }}>
            <div style={{ height: 7, borderRadius: 4, background: C.line2, overflow: "hidden" }}>
              <div style={{ width: `${Math.max(0, Math.min(100, s.operation_vci))}%`, height: "100%",
                borderRadius: 4, background: certified ? C.green : C.red }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 9, color: C.mut3 }}>
              <span>0</span><span style={{ color: C.red }}>50 · reject floor</span><span>100</span>
            </div>
          </div>
          <span style={{ fontSize: 11, color: C.mut2, lineHeight: 1.45 }}>
            Confidence in the figure — signal, physics &amp; parameters. Not a measure of emissions level.
          </span>
        </div>
      </div>

      {/* route map */}
      <div style={card}>
        <div style={sectionLbl}>Route</div>
        <MapSection legs={c.legs ?? []} />
        <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11, color: C.mut2 }}>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: C.green }} /> loaded</span>
          <span><span style={{ display: "inline-block", width: 12, height: 2, verticalAlign: "middle", background: C.mut2 }} /> empty backhaul</span>
        </div>
      </div>

      {/* details + per-SKU */}
      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 16 }}>
        {f && (
          <div>
            <div style={sectionLbl}>Operation details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
              <Detail label="Operator" value={f.operator} />
              <Detail label="Vehicle" value={f.vehicle} mono />
              <Detail label="Depot" value={f.depot} />
              <Detail label="Operation type" value={f.op_type} mono />
              <Detail label="Segments" value={`loaded ${f.loaded_segments} · empty ${f.empty_segments}`} />
              <Detail label="Empty-mileage" value={`${(f.empty_mileage_ratio * 100).toFixed(1)}%`} />
              <Detail label="Loaded tkm" value={f.loaded_tkm.toFixed(1)} />
            </div>
          </div>
        )}
        {c.perSku && c.perSku.length > 0 && (
          <div>
            <div style={sectionLbl}>Per-SKU allocation</div>
            <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, overflow: "hidden" }}>
              {c.perSku.map((sku) => (
                <div key={String(sku.sku_id)} style={{ display: "flex", justifyContent: "space-between",
                  padding: "11px 14px", borderBottom: `1px solid ${C.line2}`, fontSize: 12 }}>
                  <span>SKU {sku.sku_id}</span>
                  <span style={{ fontFamily: MONO, fontWeight: 500, color: C.navy }}>
                    {sku.co2e_kg.toFixed(2)} <span style={{ color: C.mut2 }}>kgCO₂e</span>
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 14px", background: C.panel }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", color: C.mut }}>Allocated</span>
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: C.green }}>
                  {s.total_co2e_kg.toFixed(2)} kgCO₂e
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* trust */}
      <div style={{ ...card, background: C.panel }}>
        <div style={sectionLbl}>Trust &amp; verification</div>
        <div style={{ fontSize: 10.5, color: C.mut }}>Certificate SHA-256</div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: C.navy, wordBreak: "break-all", lineHeight: 1.5 }}>{c.sha256}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, marginTop: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: c.anchor.status === "stamped" ? C.green : C.amber }} />
          {c.anchor.status === "stamped"
            ? `Timestamped — RFC 3161 (${c.anchor.tsa}) · ${c.anchor.timestamp}`
            : "Not yet timestamped"}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {c.pdf && (
            <a href={`/certificates/${c.pdf}`} style={{ borderRadius: 8, background: C.navy, color: "#fff",
              padding: "8px 14px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Download PDF</a>
          )}
          <a href={verifyUrl} target="_blank" rel="noopener noreferrer"
            style={{ borderRadius: 8, border: `1px solid ${C.line}`, padding: "8px 14px", fontSize: 12,
              fontWeight: 600, color: C.ink, textDecoration: "none" }}>Verify independently ↗</a>
        </div>
      </div>

      <p style={{ fontSize: 11, color: C.mut2, marginTop: 4 }}>
        EcoTrace Green Technologies Ltd · Company No. 17180344 — CONFIDENTIAL
      </p>
    </div>
  );
}

function Detail({ label, value, mono }: { label: string; value: string | null; mono?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.line2}` }}>
      <span style={{ fontSize: 12, color: C.mut }}>{label}</span>
      <span style={{ fontSize: mono ? 11.5 : 12, fontWeight: 500, fontFamily: mono ? MONO : undefined }}>{value ?? "—"}</span>
    </div>
  );
}
