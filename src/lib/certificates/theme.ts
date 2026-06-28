// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
// Certificate / Trust-layer visual language — mirrors the PDF design
// (Claude Design 'Certificado EcoTrace'): IBM Plex, navy palette, minimalist.

export const C = {
  ink: "#16263a",
  navy: "#14375b",
  green: "#1e7a52",
  amber: "#d59440",
  red: "#b0392f",
  mut: "#5b6b7c",
  mut2: "#8593a3",
  mut3: "#aab4c0",
  line: "#e6ebf0",
  line2: "#eef1f5",
  panel: "#f9fafc",
  stage: "#eceff3",
} as const;

export const SANS = "var(--font-ibm-plex-sans), 'IBM Plex Sans', system-ui, sans-serif";
export const MONO = "var(--font-ibm-plex-mono), 'IBM Plex Mono', ui-monospace, monospace";

// ECI A–G grade colours (identical to the PDF + certificate).
export const GRADE_COLOURS: Record<string, string> = {
  A: "#2f8f63", B: "#5a9b53", C: "#a7a942", D: "#c9a83e",
  E: "#d59440", F: "#cc6b42", G: "#c04a3c",
};
