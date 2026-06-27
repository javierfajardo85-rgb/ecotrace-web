// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
"use client";
import { useEffect, useState } from "react";
import type { CertRecord } from "@/lib/certificates/types";

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
  const anchored = record.anchor.status === "confirmed";
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontWeight: 700 }}>Certificate verification</h1>
      <p style={{ color: "var(--muted-foreground)" }}>Operation {record.op_id}</p>

      <div
        style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 10,
          border: "1px solid var(--border)",
          background:
            verdict === "match" ? "#eafaef" : verdict === "mismatch" ? "#fdecea" : "var(--card)",
        }}
      >
        <strong>
          {verdict === "checking" && "Recomputing hash…"}
          {verdict === "match" && "✓ Hash matches — document is intact"}
          {verdict === "mismatch" && "✗ Hash mismatch — document may be altered"}
        </strong>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            wordBreak: "break-all",
            marginTop: 8,
          }}
        >
          {computed || "…"}
        </div>
      </div>

      <p style={{ marginTop: 16 }}>
        {anchored
          ? `Anchored on Bitcoin via OpenTimestamps (${record.anchor.anchored_at}).`
          : "Timestamp pending — awaiting Bitcoin confirmation (OpenTimestamps)."}
      </p>

      <h2 style={{ marginTop: 24, fontWeight: 700 }}>Summary</h2>
      <ul>
        <li>
          CO₂e: {s.total_co2e_kg.toFixed(2)} ± {s.interval_Y_kg.toFixed(2)} kgCO₂e{" "}
          <em>({s.standard})</em>
        </li>
        <li>Carbon Intensity (ECI): grade {s.eci_grade ?? "N/A"}</li>
        <li>Veracity (VCI): {s.operation_vci.toFixed(1)}%</li>
      </ul>
      <p style={{ color: "var(--muted-foreground)", fontSize: 13, marginTop: 16 }}>
        CO₂e is computed to ISO 14083 / GLEC. ECI and VCI are proprietary EcoTrace indices, not
        regulatory standards.
      </p>
      <footer style={{ marginTop: 24, color: "var(--muted-foreground)", fontSize: 11 }}>
        EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
      </footer>
    </div>
  );
}
