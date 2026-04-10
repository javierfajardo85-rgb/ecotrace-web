# HeroPageLead Specification (Solugen-inspired)

## Overview
- **Target file:** `src/components/HeroPageLead.tsx`
- **Reference:** `docs/design-references/solugen.com/home-desktop-1440x900.png`, `docs/design-references/solugen.com/home-mobile-390x844.png`
- **Interaction model:** mostly static; background motion optional (parallax/video not required for first pass)

## Content (startup)
- **Headline (required):** `Aquí pon el nombre de tu empresa y tu frase principal, ej: 'Cálculos de precisión para un futuro sostenible'`
- **Subheadline (optional for now):** omit or keep minimal (Solugen has a secondary line)

## Layout / DOM structure
- Section is first on page, full viewport height-ish.
- Background media layer (image/gradient) + dark scrim overlay + text block.
- Text block aligns left, max width ~800px, generous top padding to sit under fixed header.

## Styles (Solugen-like feel)
- Large display heading, tight tracking, slight optical left shift (approx via `-tracking` + optional `translateX`).
- Scrim overlay at ~0.35–0.45 opacity to ensure readability.
- Use the project tokens: `--background` / `--foreground`, but allow hero background to be darker so white text reads.

## Behaviors
- No required state changes for v1 (Solugen header didn’t change on initial scroll sweep).

## Responsive
- Desktop: large headline (fluid or stepped)
- Mobile: smaller but still bold presence; maintain left alignment and spacing

