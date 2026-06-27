// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Link from "next/link";
import { getAllCertRecords } from "@/lib/certificates";
import { ECIBadge } from "@/components/dashboard/eci-badge";

function routeLabel(legs: { origin: string; dest: string }[] | undefined): string {
  if (!legs || !legs.length) return "—";
  const stops = [legs[0].origin, ...legs.map((l) => l.dest)];
  return stops.join(" → ");
}

export default function CertificatesPage() {
  const certs = getAllCertRecords();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-medium">Certificates</h1>
        <p className="text-xs text-muted-foreground">
          ISO 14083 Operation Certificates. CO₂e is ISO 14083 / GLEC; ECI and VCI are proprietary
          EcoTrace indices.
        </p>
      </div>
      <div className="rounded-lg border text-sm overflow-x-auto">
        <div className="grid grid-cols-[1fr_1.6fr_0.8fr_0.6fr_0.9fr_0.8fr] gap-2 bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          <span>Operation</span><span>Route</span><span className="text-right">t CO₂e</span>
          <span className="text-center">ECI</span><span className="text-right">VCI</span><span className="text-right">Anchor</span>
        </div>
        {certs.map((c) => {
          const certified = c.summary.operation_vci >= 50;
          return (
            <Link
              key={c.op_id}
              href={`/dashboard/certificates/${c.op_id}`}
              className="grid grid-cols-[1fr_1.6fr_0.8fr_0.6fr_0.9fr_0.8fr] gap-2 border-t px-3 py-2 hover:bg-muted"
            >
              <span className="font-medium">{c.op_id}</span>
              <span className="text-muted-foreground truncate">{routeLabel(c.legs)}</span>
              <span className="text-right">{(c.summary.total_co2e_kg / 1000).toFixed(2)}</span>
              <span className="text-center"><ECIBadge grade={c.summary.eci_grade} /></span>
              <span className={`text-right ${certified ? "text-green-700" : "text-red-700"}`}>
                {c.summary.operation_vci.toFixed(1)}% {certified ? "Certified" : "REJECTED"}
              </span>
              <span className="text-right text-muted-foreground capitalize">{c.anchor.status}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
