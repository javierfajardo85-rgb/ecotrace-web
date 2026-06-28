// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
import Image from "next/image";
import { getCertRecord } from "@/lib/certificates";
import { ibmPlexSans, ibmPlexMono } from "@/lib/fonts";
import { C, SANS } from "@/lib/certificates/theme";
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

  return (
    <div
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      style={{ fontFamily: SANS, color: C.ink, background: C.stage, minHeight: "100vh" }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px" }}>
        <Image src="/images/ecotrace-logo.png" alt="EcoTrace" width={140} height={33}
               style={{ height: 28, width: "auto" }} priority />
        {!record ? (
          <div style={{ marginTop: 32 }}>
            <h1 style={{ fontWeight: 600, color: C.navy }}>Certificate not found</h1>
            <p style={{ color: C.mut }}>No certificate is registered for “{id}”.</p>
          </div>
        ) : (
          <VerifyClient record={record} claimedHash={h ?? null} />
        )}
      </div>
    </div>
  );
}
