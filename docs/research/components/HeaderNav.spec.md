# HeaderNav Specification (Solugen-inspired)

## Overview
- **Target file:** `src/components/HeaderNav.tsx`
- **Reference:** `docs/design-references/solugen.com/home-desktop-1440x900.png`
- **Interaction model:** click-driven (mobile menu)

## Visual intent (match Solugen “feeling”)
- Transparent, fixed header overlaying the hero.
- Minimal, high-contrast typography (ink on light background).
- Subtle separators and micro-interactions (hover underline / thin rule).

## Layout / DOM structure
- Root: fixed container, full width, top: 0, z-high
- Inner: max-width container, left logo, right nav links + CTA button
- Mobile: collapses into menu button; panel slides down

## Styles (project tokens)
- Background: transparent (no blur/shadow by default)
- Text: `var(--foreground)` on light hero; should remain readable
- Height target: ~80–90px on desktop (Solugen recon saw `85px`)
- Link typography: small caps/normal with tight tracking feel

## Behaviors
- **Scroll behavior:** stays transparent at least through first ~220px (from recon)
- **Mobile menu:** toggles open/close, closes on link click
- **Hover:** links show underline / thin rule (no heavy button styling)

## Responsive
- **Desktop:** horizontal nav
- **Mobile:** hamburger/menu button + vertical list

