// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import { notFound } from "next/navigation";
import { getCertRecord } from "@/lib/certificates";
import { CertificateDetailView } from "@/components/certificates/certificate-detail-view";

export default async function CertificateDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCertRecord(id);
  if (!c) notFound();
  return <CertificateDetailView cert={c} backHref="/dashboard/certificates" backLabel="All certificates" />;
}
