// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
"use client";
import { useEffect, useState } from "react";
import type { CertRecord } from "@/lib/certificates/types";
import { C, MONO } from "@/lib/certificates/theme";

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type Verdict = "checking" | "match" | "mismatch";

export default function VerifyClient({
  record,
  claimedHash,
}: {
  record: CertRecord;
  claimedHash: string | null;
}) {
  const [verdict, setVerdict] = useState<Verdict>("checking");
  const [computed, setComputed] = useState<string>("");

  useEffect(() => {
    sha256Hex(record.canonical).then((h) => {
      setComputed(h);
      const ok = h === record.sha256 && (!claimedHash || claimedHash === record.sha256);
      setVerdict(ok ? "match" : "mismatch");
    });
  }, [record, claimedHash]);

  const s = record.summary;
  const anchored = record.anchor.status === "stamped";
  const ok = verdict === "match";
  const card: React.CSSProperties = { border: `1px solid ${C.line}`, borderRadius: 12, padding: 18, background: "#fff" };

  return (
    <div style={{ marginTop: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", color: C.navy, margin: 0 }}>
        Certificate verification
      </h1>
      <p style={{ fontFamily: MONO, fontSize: 12.5, color: C.mut, marginTop: 4 }}>Operation {record.op_id}</p>

      <div style={{ ...card, marginTop: 16,
        border: `1px solid ${verdict === "mismatch" ? "#e8c9c5" : verdict === "match" ? "#cfe6da" : C.line}`,
        background: verdict === "match" ? "#f1f8f4" : verdict === "mismatch" ? "#fcf4f3" : "#fff" }}>
        <strong style={{ color: ok ? C.green : verdict === "mismatch" ? C.red : C.ink, fontWeight: 600 }}>
          {verdict === "checking" && "Recomputing hash…"}
          {verdict === "match" && "✓ Hash matches — document is intact"}
          {verdict === "mismatch" && "✗ Hash mismatch — document may be altered"}
        </strong>
        <div style={{ fontFamily: MONO, fontSize: 11, color: C.navy, wordBreak: "break-all", marginTop: 8 }}>
          {computed || "…"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, marginTop: 10, color: C.ink }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: anchored ? C.green : C.amber }} />
          {anchored
            ? `Timestamped via RFC 3161 (${record.anchor.tsa}) at ${record.anchor.timestamp}.`
            : "Not yet timestamped."}
        </div>
      </div>

      <div style={{ ...card, marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase",
          color: C.mut2, marginBottom: 12 }}>Summary</div>
        <Row label="CO₂e" value={`${s.total_co2e_kg.toFixed(2)} ± ${s.interval_Y_kg.toFixed(2)} kgCO₂e`} sub={s.standard} />
        <Row label="Carbon Intensity (ECI)" value={`grade ${s.eci_grade ?? "N/A"}`} />
        <Row label="Veracity (VCI)" value={`${s.operation_vci.toFixed(1)}%`} last />
      </div>

      <p style={{ color: C.mut, fontSize: 12.5, marginTop: 16, lineHeight: 1.6 }}>
        CO₂e is computed to ISO 14083 / GLEC (an audited standard). ECI and VCI are proprietary
        EcoTrace indices — they are not regulatory standards.
      </p>
      <footer style={{ marginTop: 24, color: C.mut2, fontSize: 11 }}>
        EcoTrace Green Technologies Ltd · Company No. 17180344 — CONFIDENTIAL
      </footer>
    </div>
  );
}

function Row({ label, value, sub, last }: { label: string; value: string; sub?: string; last?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
      padding: "9px 0", borderBottom: last ? "none" : `1px solid ${C.line2}` }}>
      <span style={{ fontSize: 12.5, color: C.mut }}>{label}</span>
      <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 500, color: C.navy, textAlign: "right" }}>
        {value}{sub && <span style={{ color: C.mut2, fontWeight: 400 }}> · {sub}</span>}
      </span>
    </div>
  );
}
