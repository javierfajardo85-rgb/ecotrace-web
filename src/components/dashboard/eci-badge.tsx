// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
// ECI A–G grade badge (proprietary EcoTrace index). Palette mirrors the PDF/design.
import { GRADE_COLOURS, C } from "@/lib/certificates/theme";

export function ECIBadge({ grade, size = 24 }: { grade: string | null; size?: number }) {
  if (!grade || grade === "N/A") {
    return (
      <span style={{ display: "inline-block", borderRadius: 999, background: C.line2,
                     padding: "2px 8px", fontSize: 11, color: C.mut2 }}>ECI N/A</span>
    );
  }
  const bg = GRADE_COLOURS[grade] ?? "#999";
  return (
    <span
      style={{ display: "inline-flex", width: size, height: size, alignItems: "center",
               justifyContent: "center", borderRadius: 7, background: bg, color: "#fff",
               fontSize: size * 0.5, fontWeight: 700 }}
      title={`ECI grade ${grade} (EcoTrace index — not a regulatory standard)`}
    >
      {grade}
    </span>
  );
}
