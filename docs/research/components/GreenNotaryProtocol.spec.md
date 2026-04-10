# GreenNotaryProtocol Specification (“Protocolo de Notaría Verde”)

## Overview
- **Target file:** `src/components/GreenNotaryProtocol.tsx`
- **Reference inspiration:** Solugen “Bioforge” section feel (technical + premium + interactive), but simplified to 3 steps.
- **Interaction model:** mostly static + hover micro-interactions

## Goal
Explain EcoTrace’s workflow as an elegant 3-step technical protocol with connected steps (lines), minimal copy, and strong iconography.

## Content
- Eyebrow: `Protocolo de Notaría Verde`
- Title: `Tres pasos para certificar la verdad`
- Steps (3):
  1. **Ingesta** — “Captura automática de facturas y albaranes.”
  2. **Procesado** — “Análisis químico/matemático estándar.”
  3. **Certificación** — “Emisión del sello EcoTrace inmutable.”

## Visual design
- Background: `--background` (off-white `#f3f3f3`)
- Accents: `--accent` (forest green) for badges, connectors, and highlights
- Cards: `--card` with crisp border and soft hover shadow/elevation

## Layout
- Desktop: 3 columns with connecting line running behind cards
- Mobile: stacked cards with a vertical connector line on the left

## Behaviors
- Hover: card lifts slightly and shadow softens in; icon badge brightens subtly

