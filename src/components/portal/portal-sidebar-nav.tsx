// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { C } from "@/lib/certificates/theme";

const items = [
  { href: "/portal", label: "Overview" },
  { href: "/portal/operations", label: "Operations" },
  { href: "/portal/compliance", label: "Compliance" },
  { href: "/portal/fleet", label: "Fleet & routes" },
  { href: "/portal/reports", label: "Reports" },
];

export function PortalSidebarNav() {
  const pathname = usePathname();
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: 8 }}>
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link key={it.href} href={it.href} style={{ padding: "8px 12px", borderRadius: 8, textDecoration: "none",
            fontSize: 13.5, color: active ? C.navy : C.mut, fontWeight: active ? 600 : 400,
            background: active ? "#eef3f8" : "transparent" }}>{it.label}</Link>
        );
      })}
    </nav>
  );
}
