# Solugen homepage — Page topology (from `home.html`)

Target: `https://www.solugen.com/`

## Section order (top → bottom)

1. **Grid overlay wrapper**
   - `div.grid > div.grid-inner > div.grid-column * 12`
   - Visual motif: subtle column grid lines/structure.

2. **Header / Nav**
   - `header.header.header--home`
   - Logo SVG + nav items (Solutions / Our Technology / People / Latest)
   - Mobile menu trigger + molecules image (`nav__molecules`)

3. **Hero / Page lead (parallax)**
   - `section#page-lead.section--page-lead.page-lead--parallax.page-lead--larger-headline`
   - Background:
     - CSS background-image swaps at ~431px
     - Vimeo background video iframe (desktop + mobile URLs)
   - Overlay scrim: `.page-lead__screen` with inline `opacity: 0.4`
   - Copy:
     - Heading: “Not your typical chemical company”
     - Subheadline: “Innovative solutions designed to meet the toughest industrial challenges”

4. **Markets / Solutions slider**
   - `section.section--markets-slider.markets-slider` (Swiper)
   - Eyebrow: “Solutions”
   - Intro paragraph
   - Carousel items (e.g., Oil & Gas, Renewable Fuels, Aerospace & Defense)

5. **Bioforge (interactive media + info cards)**
   - `section#js-bioforge-home.bioforge.bioforge--modular`
   - Has scroll/video sequence imagery and multiple “advantage” items:
     - “Sustainable Feedstocks”, “Efficient Processes”, “Local Supply Chains”
   - Desktop info cards + mobile accordion/buttons (`data-index`)

6. **Centered eyebrow + CTA**
   - `section.section--centered.centered-eyebrow-text--black...`
   - Includes “Partner With Us” CTA button (seen in markup)

7. **Press / “In Good Company” previews (tabs)**
   - `section.section--previews.section--previews--black` with `data-tabs`
   - Heading: “In Good Company”
   - Preview cards + “Read the Latest” button linking into press category

8. **Newsletter / secondary CTA block**
   - Newsletter signup UI (`#js-newsletter-signup`) with email input + “Sign Up”

9. **Footer**
   - `footer.footer`
   - Address, privacy policy, social links, buttons

10. **Modal: “Select your Inquiry”**
   - Popup/modal UI for Partner With Us / Request a Sample / Press Inquiry / General

## Interaction model notes (from markup hints)
- **Nav**: JS-driven open/close + subnav (“Back” button present).
- **Hero**: background video + parallax class suggests scroll-based motion.
- **Markets slider**: Swiper carousel (prev/next buttons).
- **Bioforge**: multi-state content (mobile buttons + desktop panels; likely scroll/toggle driven).
- **Previews**: tabs (`data-tabs`).
- **Inquiry modal**: open/close + multiple form states.
