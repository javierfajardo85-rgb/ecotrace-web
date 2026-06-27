// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCertRecord } from "@/lib/certificates";
import { ECIBadge } from "@/components/dashboard/eci-badge";
import { MapSection } from "@/components/dashboard/map-section";

const VERIFY_BASE = "https://verify.ecotracegreen.com";

export default async function CertificateDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCertRecord(id);
  if (!c) notFound();

  const s = c.summary;
  const f = c.facts;
  const certified = s.operation_vci >= 50;
  const verifyUrl = `${VERIFY_BASE}/cert/${c.op_id}?h=${c.sha256}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Operation {c.op_id}</h1>
        <Link href="/dashboard/certificates" className="text-xs text-muted-foreground hover:underline">
          ← All certificates
        </Link>
      </div>

      {/* CO2e hero — the ISO-audited figure */}
      <div className="rounded-lg border p-4">
        <span className="float-right rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
          {s.standard}
        </span>
        <div className="text-2xl font-bold">
          {s.total_co2e_kg.toFixed(2)} <span className="text-base text-muted-foreground">± {s.interval_Y_kg.toFixed(2)}</span>{" "}
          <span className="text-base">kgCO₂e</span>
        </div>
        <div className="text-xs text-muted-foreground">Operation carbon footprint — audited to ISO 14083 / GLEC</div>
      </div>

      {/* ECI + VCI (proprietary indices) */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border p-3">
          <div className="mb-1 text-xs text-muted-foreground">Carbon Intensity (ECI)</div>
          <div className="flex items-center gap-2">
            <ECIBadge grade={s.eci_grade} />
            <span className="text-sm">
              {s.eci_metric_gco2e_per_tkm != null ? `${s.eci_metric_gco2e_per_tkm.toFixed(1)} gCO₂e/tkm` : "N/A"}
            </span>
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">EcoTrace index — not a regulatory standard</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="mb-1 text-xs text-muted-foreground">Veracity (VCI)</div>
          <div className={`text-sm font-medium ${certified ? "text-green-700" : "text-red-700"}`}>
            {s.operation_vci.toFixed(1)}% — {certified ? "Certified" : "REJECTED"}
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">
            Measurement reliability, not a regulatory standard
          </div>
        </div>
      </div>

      {/* Route map */}
      <div className="rounded-lg border p-3">
        <div className="mb-2 text-sm font-medium">Route</div>
        <MapSection legs={c.legs ?? []} />
        <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
          <span><span className="inline-block size-2 rounded-full" style={{ background: "#1bbf3c" }} /> loaded</span>
          <span><span className="inline-block h-0.5 w-3 align-middle" style={{ background: "#888" }} /> empty backhaul</span>
        </div>
      </div>

      {/* Operation facts */}
      {f && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 rounded-lg border p-3 text-sm md:grid-cols-3">
          <Fact label="Vehicle" value={f.vehicle} />
          <Fact label="Depot" value={f.depot} />
          <Fact label="Operation" value={f.op_type} />
          <Fact label="Segments" value={`loaded ${f.loaded_segments} · empty ${f.empty_segments}`} />
          <Fact label="Empty-mileage" value={`${(f.empty_mileage_ratio * 100).toFixed(1)}%`} />
          <Fact label="Loaded tkm" value={f.loaded_tkm.toFixed(1)} />
        </div>
      )}

      {/* Per-SKU */}
      {c.perSku && c.perSku.length > 0 && (
        <div className="rounded-lg border text-sm">
          <div className="bg-muted/50 px-3 py-2 text-xs text-muted-foreground">Per-SKU allocation</div>
          {c.perSku.map((sku) => (
            <div key={String(sku.sku_id)} className="flex justify-between border-t px-3 py-2">
              <span>SKU {sku.sku_id}</span>
              <span>{sku.co2e_kg.toFixed(2)} kgCO₂e</span>
            </div>
          ))}
        </div>
      )}

      {/* Trust & verification */}
      <div className="rounded-lg border p-3">
        <div className="mb-2 text-sm font-medium">Trust &amp; Verification</div>
        <div className="text-xs text-muted-foreground">Certificate SHA-256</div>
        <div className="font-mono text-xs break-all">{c.sha256}</div>
        <div className="mt-1 text-xs">
          {c.anchor.status === "confirmed"
            ? `Anchored on Bitcoin via OpenTimestamps (${c.anchor.anchored_at}).`
            : "Timestamp pending — awaiting Bitcoin confirmation (OpenTimestamps)."}
        </div>
        <div className="mt-3 flex gap-3">
          {c.pdf && (
            <a
              href={`/certificates/${c.pdf}`}
              className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              Download PDF
            </a>
          )}
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            Verify independently ↗
          </a>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
      </p>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex justify-between border-b border-dotted py-1">
      <span className="text-muted-foreground">{label}</span>
      <span>{value ?? "—"}</span>
    </div>
  );
}
