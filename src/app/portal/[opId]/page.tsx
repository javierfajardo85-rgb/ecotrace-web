// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import { notFound } from "next/navigation";
import { requireClientSession } from "@/lib/portal-auth";
import { getCertRecord } from "@/lib/certificates";
import { CertificateDetailView } from "@/components/certificates/certificate-detail-view";

export default async function PortalCertificateDetail({ params }: { params: Promise<{ opId: string }> }) {
  const clientName = await requireClientSession();
  const { opId } = await params;
  const c = getCertRecord(opId);
  // Ownership check: never confirm another client's opId exists — 404, not 403.
  if (!c || c.facts?.operator !== clientName) notFound();
  return <CertificateDetailView cert={c} backHref="/portal" backLabel="All operations" />;
}
