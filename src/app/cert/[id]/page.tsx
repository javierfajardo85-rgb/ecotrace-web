// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import { getCertRecord } from "@/lib/certificates";
import VerifyClient from "./VerifyClient";

export default async function CertPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ h?: string }>;
}) {
  const { id } = await params;
  const { h } = await searchParams;
  const record = getCertRecord(id);

  if (!record) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
        <h1 style={{ fontWeight: 700 }}>Certificate not found</h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          No certificate is registered for “{id}”.
        </p>
      </div>
    );
  }
  return <VerifyClient record={record} claimedHash={h ?? null} />;
}
