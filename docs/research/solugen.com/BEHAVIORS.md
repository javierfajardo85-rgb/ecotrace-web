# Solugen Reconnaissance

- **URL**: `https://www.solugen.com/`
- **Captured at**: `2026-04-08T06:06:31.162Z`

## Screenshots

- Desktop: `docs/design-references/solugen.com/home-desktop-1440x900.png`
- Mobile: `docs/design-references/solugen.com/home-mobile-390x844.png`

## Fonts (sampled)

Desktop fonts (unique, first 40):

- `"Times New Roman"`
- `"GT America", sans-serif`
- `"GT Zirkon", sans-serif`
- `"GT America"`
- `"GT Zirkon"`

## Color samples (from key elements)

Desktop colors:

- `rgb(17, 17, 17)`
- `rgb(243, 243, 243)`
- `rgb(255, 255, 255)`
- `rgba(0, 0, 0, 0)`
- `rgb(237, 237, 237)`

## Smooth scroll hints

- Desktop: lenis=false, locomotive=false
- Mobile: lenis=false, locomotive=false

## Header style changes (scroll 0 → 220px)

### Desktop

- Top: `{"position":"fixed","top":"0px","backgroundColor":"rgba(0, 0, 0, 0)","backdropFilter":"none","boxShadow":"none","height":"85px"}`
- Scrolled: `{"position":"fixed","top":"0px","backgroundColor":"rgba(0, 0, 0, 0)","backdropFilter":"none","boxShadow":"none","height":"85px"}`

### Mobile

- Top: `{"position":"fixed","top":"0px","backgroundColor":"rgba(0, 0, 0, 0)","backdropFilter":"none","boxShadow":"none","height":"85px"}`
- Scrolled: `{"position":"fixed","top":"0px","backgroundColor":"rgba(0, 0, 0, 0)","backdropFilter":"none","boxShadow":"none","height":"85px"}`

## Sections (from DOM)

### Desktop

- 0. id=page-lead data-init=PageLead class=`section page-lead section--page-lead page-lead--parallax page-lead--larger-headline`
- 1. id=— data-init=MarketSlider class=`section section--markets-slider markets-slider`
- 2. id=js-bioforge-home data-init=— class=`bioforge bioforge--modular`
- 3. id=— data-init=CenteredEyebrowText class=`section section--centered centered-eyebrow-text centered-eyebrow-text--black centered-eyebrow-text--full-height`
- 4. id=— data-init=Tabs class=`section section--previews section--previews--black`
- 5. id=— data-init=— class=`ctas`

## Favicons

- `https://solugen.com/wp-content/themes/solugen/static/img/favicon/apple-touch-icon.png`
- `https://solugen.com/wp-content/themes/solugen/static/img/favicon/favicon-32x32.png`
- `https://solugen.com/wp-content/themes/solugen/static/img/favicon/favicon-16x16.png`
- `https://solugen.com/wp-content/themes/solugen/static/img/favicon/safari-pinned-tab.svg`
- `https://solugen.com/wp-content/themes/solugen/static/img/favicon/favicon.ico`

## Notes

This recon is automated and intentionally conservative; component-level specs still require per-section computed style extraction once we decide which sections to build first.
