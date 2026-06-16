# Customer Dashboard — Design Spec

**Status:** Approved design, ready for implementation plan
**Date:** 2026-06-16
**Repo:** `ecotrace-web` (Next.js App Router · Tailwind v4 · shadcn/ui)

---

## 1. Purpose & audience

A customer-facing dashboard for **logistics / HGV fleet operators** using EcoTrace to measure
their freight CO₂e. It does three jobs, layered:

1. **Measurement** — show the precisely *measured* footprint (Omega Engine, ±0.43%) and the
   differentiator versus average emission factors.
2. **Compliance** — turn that measurement into audit-ready regulatory proof (ISO 14083, GLEC,
   GHG Protocol Scope 3, CSRD/ESRS E1).
3. **Operations** — let the ops team act: route/vehicle intensity, anomalies, overload.

The single customer view combines all three, with the **Overview** page as the layered summary
and dedicated pages for depth.

## 2. Scope (this effort)

**Deliverable:** a high-fidelity, navigable **prototype** with realistic **mock data** (seeded
from real SCVE campaign results). No live backend wiring.

**In scope:** UI for all sections, design system reuse, mock data layer, responsive light theme.
**Out of scope (later phases):** authentication/login, live data pipeline & APIs, multi-tenant
data, i18n (Spanish), report PDF/XBRL generation, real map tiles billing.

## 3. Information architecture

Sidebar app (left nav, persistent). Five sections:

| Section | Role |
|---|---|
| **Overview** | Layered summary: measurement hero → compliance status → operations snapshot |
| **Compliance** | Framework status, methodology/provenance, downloadable auditable reports |
| **Operations** | Filters, KPIs, intensity by route type, highest-intensity routes (anomaly/overload) |
| **Fleet & routes** | Vehicle inventory + real-route map (sovereign-geo angle) |
| **Reports** | History of generated reports / exports |

## 4. Visual direction

**Direction A — "brand-clear" (light)**, identical to ecotracegreen.com for full consistency.

- Reuse the existing design tokens already in `globals.css`: ink-on-white, single green accent
  `--accent: oklch(0.71 0.2 145)` (≈ `#1bbf3c`), grayscale `--chart-*`, the `--sidebar-*` tokens.
- Fonts already loaded: Inter (sans), Outfit (headings), Geist Mono.
- Reuse shadcn/ui. Only `button` is generated today; the dashboard adds: `sidebar`, `card`,
  `table`, `badge`, `chart` (recharts), `dropdown-menu`, `tabs`, `separator`, `avatar`.
- Aesthetic: flat, minimal, generous whitespace, 0.5px borders, radius from `--radius`. Green is
  used sparingly — accent, active nav, positive/measured states. Amber = anomaly, red = overload.

## 5. Sections in detail

### 5.1 Overview (layered)
- **Hero:** measured fleet CO₂e total (t) + `measured ±0.43%` chip + inline comparison
  *"average factors would report 1,392 t (+11.6%)"* — the core value proposition.
- **Metric cards (4):** intensity (gCO₂e/t·km), data precision (±%), coverage (routes), anomalies.
- **Compliance chips:** ISO 14083 · GLEC v3 · GHG Protocol Scope 3 · CSRD-ready.
- **Charts:** monthly CO₂e trend (area/line) + breakdown by fleet segment (bars).
- **CTA:** Download audit report (PDF).

### 5.2 Compliance & reporting
- **Framework status cards:** ISO 14083, GLEC v3, GHG Protocol Scope 3.4/3.9, CSRD ESRS E1 — each
  with status (Verified / Ready / Draft) and coverage line.
- **Methodology & data provenance** panel: Omega Engine (PINN) · measured ±0.43% · real OSM routes
  · ERA5 weather · GLO-30 elevation · CAN-bus fuel rate. This is the audit-grade credibility.
- **Auditable reports list:** Scope 3 report (PDF), ISO 14083 methodology statement (PDF),
  CSRD ESRS E1 datapoints (CSV/XBRL), auditor evidence pack (ZIP, per-route).
- **Assurance-ready** badge.

### 5.3 Operations
- **Filters:** vehicle class, route type, period.
- **KPI strip:** routes analysed, avg intensity, flagged (anomaly / overload counts).
- **Intensity by route type:** bars — city high-traffic > city low-traffic > intercity.
- **Highest-intensity routes table:** route, vehicle, km, t CO₂e, status badge
  (OK / Anomaly / Overload). Surfaces the engine's anomaly (C_rr out of band) and overload
  (measured mass > declared, EIV estimator) detections.

### 5.4 Fleet & routes
- Vehicle inventory table (id, segment, declared mass, routes, avg intensity, status).
- Real-route map panel (sovereign-geo): routes plotted on a map; click a route → detail. For the
  prototype, a static/styled map placeholder or a lightweight tile map with mock polylines.

### 5.5 Reports
- History list of generated reports with type, period, format, date, download. Empty-state +
  "Generate report" action (stubbed in prototype).

## 6. Mock data model

A typed seed module (`lib/dashboard/mock-data.ts`) derived from real campaign outputs:

- `fleetSummary`: total CO₂e, avg intensity, precision, coverage, avgFactorComparisonPct.
- `segments[]`: { name, sharePct, intensity } for the 5 SCVE fleets (renamed to product terms).
- `compliance[]`: { framework, status, coverage }.
- `monthlyCo2e[]`: trend series.
- `routes[]`: { id, origin, dest, vehicle, km, co2eT, intensity, status: ok|anomaly|overload }.
- `reports[]`: { name, type, format, date }.

Values seeded from campaign figures (CO₂e MAPE ~0.43%, 3,000 routes, 5 segments, route classes
intercity/city_low/city_high, anomaly & overload flags).

## 7. Technical approach

- **Location:** a route group `src/app/(dashboard)/dashboard/...` in `ecotrace-web`, with its own
  layout (sidebar shell). Keeps the marketing site and the app cleanly separated while sharing the
  design system.
- **Layout shell unit:** `DashboardShell` (sidebar + topbar + content slot). One clear purpose,
  reused by every page.
- **Page units:** one component per section (`OverviewPage`, `CompliancePage`, …), each consuming
  the typed mock-data module through a small selector — pages don't reach into raw data shape.
- **Charts:** shadcn `chart` (recharts). Keep to area/line + bar; no exotic chart types.
- **State:** period/filter selectors are local UI state in the prototype (no server round-trips).
- **i18n / auth / live data:** explicitly deferred; structure the data access behind a thin
  `getDashboardData()` so swapping mock → API later is a one-file change.

## 8. Out of scope (restated)

Auth, live APIs, real report generation, billing, Spanish localisation, real map tile contracts.

## 9. Success criteria

- A stakeholder can click through all five sections and immediately understand: the measured
  footprint, why it beats average factors, the compliance posture, and where to act.
- Visually indistinguishable from ecotracegreen.com's design language.
- Mock data is realistic enough to demo to a prospective customer or investor.
- Data access is isolated behind one seam so live wiring is a contained future task.

## 10. Open questions

- Map implementation for Fleet & routes in the prototype: static styled placeholder vs lightweight
  tile map — decide at implementation time based on effort.
- Exact product names for the 5 fleet segments (currently: Standard HGV, Medium duty, Eco trailer,
  Aged fleet; "Anomalous" repurposed as a flag, not a segment).

---

*EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL*
