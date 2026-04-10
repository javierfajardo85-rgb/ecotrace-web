# Solugen (`solugen.com`) — Design tokens (extracted)

Source artifacts:
- `docs/research/solugen.com/home.html`
- `docs/research/solugen.com/app.css` (and `app.pretty.css`)

## Typography

### Font families
- **Sans / body**: `"GT America", sans-serif`
- **Headings / display**: `"GT Zirkon", sans-serif`

### Self-hosted font files (from `@font-face`)
From `app.css`:
- **GT America**: Regular (400), Medium (500), Bold (700) + italics
- **GT Zirkon**: Light (200), Regular (400) + italics

Local copies downloaded to:
- `src/fonts/solugen/*.woff2`

### Base type styles (not exhaustive)
From computed rules in `app.css`:
- **Body**: `font-size: 14px` → fluid up to `22px`, `line-height: 1.36`, `font-weight: 300` (renders close to 400 when only 400/500/700 are available)
- **H1**: Zirkon 400, `letter-spacing: -0.03em`, `transform: translateX(-0.085em)`, responsive sizes
- **H2**: Zirkon 400, similar tracking + translateX, `word-spacing: .065em`

## Color palette (unique hexes found in `app.css`)

Neutrals (dominant):
- `#f3f3f3` (page background)
- `#111111` (ink / dark sections)
- `#ffffff`, `#fdfdfd`
- `#ededed`, `#ebebeb`, `#e5e5e7`, `#dddddd`, `#cdcdcd`, `#c4c4c4`
- `#a7a7a7`, `#777777`, `#666666`, `#5e5e5e`, `#444444`, `#414141`, `#272727`, `#171717`, `#0e0e0e`, `#0c0c0c`, `#000000`

Accents (observed):
- `#c520c3` (magenta accent; seen on hover states)
- `#d32cae` (related magenta)
- `#0025f5`, `#67a4ff` (blue accents)
- `#bae04e` (lime accent)
- `#00a2e6` (cyan-ish accent)
- Utility/status colors: `#ff0000`, `#ff9900`, `#ffea00`, `#ffff00`

Selections:
- `::selection` background `#0c0c0c`, text `#eee`

## Layout + “feeling” notes (high-signal)
- **High-contrast editorial feel**: light paper background + ink black type.
- **Large heading scale with tight tracking**: `letter-spacing: -0.03em` + subtle left “optical” shift (`translateX(-0.085em)`).
- **Mixed media hero**: background video (Vimeo iframe) + image fallback + dark scrim overlay.
- **Grid overlay motif**: page includes a 12-column “grid” element at top-level (`div.grid > div.grid-inner > ...`).
