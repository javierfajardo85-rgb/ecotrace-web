# EnginesGrid Specification (“Nuestros Motores de Cálculo”)

## Overview
- **Target file:** `src/components/EnginesGrid.tsx`
- **Reference aesthetic:** Solugen markets cards (but layout is a grid, not a slider)
- **Interaction model:** hover-driven (card hover), click-driven (optional links)

## Content
- Section eyebrow: `Nuestros Motores de Cálculo`
- Section intro (optional): 1–2 lines explaining the 6 areas
- Cards: 6 items (your business areas). Use short label + 1 sentence.

## Layout
- Container with max-width and generous vertical padding.
- Grid:
  - Desktop: 3 columns
  - Tablet: 2 columns
  - Mobile: 1 column

## Card aesthetic (Solugen-inspired)
- Light card on light background with crisp border (`--border`) and subtle shadow on hover.
- Image slot optional (for now use a simple top “badge”/icon placeholder).
- Title uses heading font; description uses body font.
- Hover: border darkens slightly, subtle translateY(-2px), shadow fades in.

## Accessibility
- Cards are focusable links/buttons when interactive; visible focus ring using `--ring`.

