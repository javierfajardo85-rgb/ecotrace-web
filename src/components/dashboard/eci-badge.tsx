// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
// ECI A–G grade badge (proprietary EcoTrace index). Palette mirrors the PDF.
const GRADE_COLOURS: Record<string, string> = {
  A: "#1a9641", B: "#5cb15f", C: "#a6d96a", D: "#fee08b",
  E: "#fdae61", F: "#f46d43", G: "#d7191c",
};

export function ECIBadge({ grade }: { grade: string | null }) {
  if (!grade || grade === "N/A") {
    return <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">ECI N/A</span>;
  }
  const bg = GRADE_COLOURS[grade] ?? "#999";
  // dark text on the light A–C / D bands, white on the darker E–G
  const dark = ["A", "B", "C", "D"].includes(grade);
  return (
    <span
      className="inline-flex size-6 items-center justify-center rounded-md text-xs font-bold"
      style={{ background: bg, color: dark ? "#111" : "#fff" }}
      title={`ECI grade ${grade} (EcoTrace index — not a regulatory standard)`}
    >
      {grade}
    </span>
  );
}
