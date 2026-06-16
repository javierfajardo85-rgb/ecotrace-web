# Customer Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-fidelity, navigable customer dashboard prototype (Overview, Compliance, Operations, Fleet & routes, Reports) wired to typed mock data seeded from real SCVE campaign results.

**Architecture:** A Next.js App Router route group `(dashboard)` in `ecotrace-web`, with a `DashboardShell` (sidebar + topbar) layout. Pages are server components that read a single typed mock-data module through selectors; the only client components are the charts (recharts via shadcn `chart`). No backend — all data is local and behind one seam (`getDashboardData`) so live wiring is a future one-file change.

**Tech Stack:** Next.js (App Router, RSC), TypeScript, Tailwind v4, shadcn/ui (style `base-nova`, lucide icons), recharts, Playwright (E2E).

**Design source of truth:** `docs/superpowers/specs/2026-06-16-customer-dashboard-design.md` and the approved mockups (Overview / Compliance / Operations). Brand: light, ink-on-white, single green accent `#1bbf3c` (token `--accent`); amber = anomaly, red = overload.

---

## File Structure

```
playwright.config.ts                              -- E2E config, auto-starts next dev
tests/e2e/dashboard.spec.ts                       -- one describe block per page
src/lib/dashboard/types.ts                        -- typed interfaces for all dashboard data
src/lib/dashboard/mock-data.ts                    -- seed data (from campaign figures)
src/lib/dashboard/index.ts                        -- getDashboardData() seam + selectors
src/components/dashboard/dashboard-shell.tsx      -- sidebar + topbar + content slot
src/components/dashboard/sidebar-nav.tsx          -- nav items + active state (client)
src/components/dashboard/metric-card.tsx          -- label + value tile
src/components/dashboard/status-badge.tsx         -- ok / anomaly / overload pill
src/components/dashboard/co2e-trend-chart.tsx     -- monthly area chart (client)
src/components/dashboard/segment-breakdown.tsx    -- fleet share bars
src/components/dashboard/intensity-bars.tsx       -- intensity by route type
src/components/dashboard/routes-table.tsx         -- highest-intensity routes
src/components/dashboard/compliance-cards.tsx     -- framework status cards
src/components/dashboard/provenance-panel.tsx     -- methodology chips
src/components/dashboard/reports-list.tsx         -- downloadable reports rows
src/app/(dashboard)/layout.tsx                    -- wraps pages in DashboardShell
src/app/(dashboard)/dashboard/page.tsx            -- Overview
src/app/(dashboard)/dashboard/compliance/page.tsx
src/app/(dashboard)/dashboard/operations/page.tsx
src/app/(dashboard)/dashboard/fleet/page.tsx
src/app/(dashboard)/dashboard/reports/page.tsx
```

shadcn components to generate into `src/components/ui/`: `sidebar`, `card`, `table`, `badge`, `chart`, `dropdown-menu`, `separator`, `avatar`.

**Note on testing:** there is no unit runner in this repo; Playwright is the installed test tool. We TDD at the page level: write a Playwright test that asserts the page's key content, watch it fail (route/content absent), implement, watch it pass. The mock-data module's correctness is asserted through these page tests (its numbers appear on screen) and `tsc --noEmit`.

---

## Task 1: E2E harness + dashboard route scaffold

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/dashboard.spec.ts`
- Create: `src/app/(dashboard)/dashboard/page.tsx`
- Modify: `package.json` (add `test:e2e` script)

- [ ] **Step 1: Add the Playwright config**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3000" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 2: Add the test script**

In `package.json` `scripts`, add:

```json
"test:e2e": "playwright test"
```

- [ ] **Step 3: Write the failing smoke test**

Create `tests/e2e/dashboard.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test.describe("Overview", () => {
  test("shows the measured CO2e hero", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Measured CO₂e", { exact: false })).toBeVisible();
  });
});
```

- [ ] **Step 4: Run it to verify it fails**

Run: `npx playwright test tests/e2e/dashboard.spec.ts -g "measured CO2e hero"`
Expected: FAIL — `/dashboard` 404s (page does not exist yet).

- [ ] **Step 5: Create a minimal page so the route exists**

Create `src/app/(dashboard)/dashboard/page.tsx`:

```tsx
export default function OverviewPage() {
  return <div>Measured CO₂e</div>;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx playwright test tests/e2e/dashboard.spec.ts -g "measured CO2e hero"`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add playwright.config.ts tests/e2e/dashboard.spec.ts "src/app/(dashboard)/dashboard/page.tsx" package.json
git commit -m "feat(dashboard): e2e harness + overview route scaffold"
```

---

## Task 2: Generate shadcn UI components

**Files:**
- Create: `src/components/ui/{sidebar,card,table,badge,chart,dropdown-menu,separator,avatar}.tsx` (via CLI)

- [ ] **Step 1: Run the shadcn add command**

Run:

```bash
npx shadcn@latest add sidebar card table badge chart dropdown-menu separator avatar --yes
```

Expected: files created under `src/components/ui/`; `recharts` added to dependencies (pulled by `chart`).

- [ ] **Step 2: Verify the project still builds**

Run: `npm run typecheck`
Expected: PASS (no type errors).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui package.json package-lock.json
git commit -m "feat(dashboard): add shadcn ui primitives (sidebar, card, table, chart, ...)"
```

---

## Task 3: Typed mock-data module + selector seam

**Files:**
- Create: `src/lib/dashboard/types.ts`
- Create: `src/lib/dashboard/mock-data.ts`
- Create: `src/lib/dashboard/index.ts`

- [ ] **Step 1: Define the types**

Create `src/lib/dashboard/types.ts`:

```ts
export type RouteStatus = "ok" | "anomaly" | "overload";
export type ComplianceStatus = "verified" | "ready" | "draft";

export interface FleetSummary {
  measuredCo2eT: number;
  avgFactorCo2eT: number;
  avgFactorDeltaPct: number;
  precisionPct: number;
  intensity: number;
  routesAnalysed: number;
  anomalies: number;
}
export interface Segment { name: string; sharePct: number; intensity: number; }
export interface ComplianceFramework { name: string; status: ComplianceStatus; detail: string; }
export interface MonthlyPoint { month: string; co2eT: number; }
export interface RouteRow {
  id: string; origin: string; destination: string; vehicle: string;
  km: number; co2eT: number; intensity: number; status: RouteStatus;
}
export interface RouteTypeIntensity { type: string; intensity: number; }
export interface ReportItem { name: string; kind: string; format: string; date: string; }
export interface Vehicle {
  id: string; segment: string; declaredMassKg: number; routes: number;
  intensity: number; status: RouteStatus;
}
export interface DashboardData {
  summary: FleetSummary;
  segments: Segment[];
  compliance: ComplianceFramework[];
  provenance: string[];
  monthly: MonthlyPoint[];
  routeTypeIntensity: RouteTypeIntensity[];
  routes: RouteRow[];
  reports: ReportItem[];
  vehicles: Vehicle[];
}
```

- [ ] **Step 2: Write the seed mock data**

Create `src/lib/dashboard/mock-data.ts` (values reproduce the approved mockups):

```ts
import type { DashboardData } from "./types";

export const mockData: DashboardData = {
  summary: {
    measuredCo2eT: 1247,
    avgFactorCo2eT: 1392,
    avgFactorDeltaPct: 11.6,
    precisionPct: 0.43,
    intensity: 62.4,
    routesAnalysed: 3000,
    anomalies: 3,
  },
  segments: [
    { name: "Standard HGV", sharePct: 48, intensity: 64 },
    { name: "Medium duty", sharePct: 22, intensity: 58 },
    { name: "Eco trailer", sharePct: 18, intensity: 41 },
    { name: "Aged fleet", sharePct: 12, intensity: 79 },
  ],
  compliance: [
    { name: "ISO 14083", status: "verified", detail: "Well-to-wheel GHG quantification · 3,000 / 3,000 routes covered" },
    { name: "GLEC Framework v3", status: "verified", detail: "Aligned default + modelled · primary data 100%" },
    { name: "GHG Protocol · Scope 3.4 / 3.9", status: "ready", detail: "Up- & downstream transport · category-level split" },
    { name: "CSRD · ESRS E1", status: "draft", detail: "E1-6 GHG datapoints mapped · awaiting sign-off" },
  ],
  provenance: [
    "Omega Engine · physics-informed NN",
    "measured ±0.43% (not average factors)",
    "real routes · OpenStreetMap",
    "ERA5 weather",
    "GLO-30 elevation",
    "CAN-bus fuel rate",
  ],
  monthly: [
    { month: "Jan", co2eT: 446 }, { month: "Feb", co2eT: 421 },
    { month: "Mar", co2eT: 438 }, { month: "Apr", co2eT: 410 },
    { month: "May", co2eT: 423 }, { month: "Jun", co2eT: 399 },
  ],
  routeTypeIntensity: [
    { type: "City · high traffic", intensity: 88 },
    { type: "City · low traffic", intensity: 61 },
    { type: "Intercity", intensity: 40 },
  ],
  routes: [
    { id: "r1", origin: "Hull", destination: "Bristol", vehicle: "Aged fleet", km: 363, co2eT: 0.71, intensity: 79, status: "anomaly" },
    { id: "r2", origin: "Heathrow", destination: "Stratford", vehicle: "Standard HGV", km: 31, co2eT: 0.09, intensity: 88, status: "overload" },
    { id: "r3", origin: "Wembley", destination: "Ilford", vehicle: "Medium duty", km: 23, co2eT: 0.06, intensity: 61, status: "ok" },
    { id: "r4", origin: "Birmingham", destination: "London", vehicle: "Standard HGV", km: 192, co2eT: 0.38, intensity: 40, status: "ok" },
  ],
  reports: [
    { name: "Scope 3 transport emissions report", kind: "scope3", format: "PDF", date: "24 Jun 2026" },
    { name: "ISO 14083 methodology statement", kind: "iso", format: "PDF", date: "24 Jun 2026" },
    { name: "CSRD ESRS E1 datapoints", kind: "csrd", format: "CSV · XBRL", date: "24 Jun 2026" },
    { name: "Auditor evidence pack (per-route)", kind: "evidence", format: "ZIP · 41 MB", date: "24 Jun 2026" },
  ],
  vehicles: [
    { id: "HGV-018", segment: "Standard HGV", declaredMassKg: 18000, routes: 412, intensity: 64, status: "ok" },
    { id: "HGV-044", segment: "Aged fleet", declaredMassKg: 18000, routes: 287, intensity: 79, status: "anomaly" },
    { id: "MD-073", segment: "Medium duty", declaredMassKg: 12000, routes: 351, intensity: 58, status: "overload" },
    { id: "ET-110", segment: "Eco trailer", declaredMassKg: 16000, routes: 333, intensity: 41, status: "ok" },
  ],
};
```

- [ ] **Step 3: Write the selector seam**

Create `src/lib/dashboard/index.ts`:

```ts
import { mockData } from "./mock-data";
import type { DashboardData } from "./types";

// Single seam: swap mockData for an API call when wiring live data.
export function getDashboardData(): DashboardData {
  return mockData;
}
export * from "./types";
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/dashboard
git commit -m "feat(dashboard): typed mock-data module + getDashboardData seam"
```

---

## Task 4: DashboardShell + sidebar nav + layout

**Files:**
- Create: `src/components/dashboard/sidebar-nav.tsx`
- Create: `src/components/dashboard/dashboard-shell.tsx`
- Create: `src/app/(dashboard)/layout.tsx`
- Modify: `tests/e2e/dashboard.spec.ts` (add nav test)

- [ ] **Step 1: Write the failing nav test**

Append to `tests/e2e/dashboard.spec.ts`:

```ts
test.describe("Shell", () => {
  test("sidebar shows the five sections", async ({ page }) => {
    await page.goto("/dashboard");
    const nav = page.getByRole("navigation");
    for (const label of ["Overview", "Compliance", "Operations", "Fleet & routes", "Reports"]) {
      await expect(nav.getByText(label)).toBeVisible();
    }
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test -g "sidebar shows the five sections"`
Expected: FAIL — no navigation / labels.

- [ ] **Step 3: Build the sidebar nav (client component for active state)**

Create `src/components/dashboard/sidebar-nav.tsx`:

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BadgeCheck, LineChart, Truck, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/compliance", label: "Compliance", icon: BadgeCheck },
  { href: "/dashboard/operations", label: "Operations", icon: LineChart },
  { href: "/dashboard/fleet", label: "Fleet & routes", icon: Truck },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 p-2 text-sm">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted",
              active && "bg-accent/10 font-medium text-foreground border-l-2 border-accent",
            )}
          >
            <Icon className="size-4" aria-hidden /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 4: Build the shell**

Create `src/components/dashboard/dashboard-shell.tsx`:

```tsx
import { SidebarNav } from "./sidebar-nav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl">
      <aside className="w-52 shrink-0 border-r bg-muted/30">
        <div className="flex items-center gap-2 px-4 py-3 font-medium">
          <span className="size-2.5 rounded-full bg-accent" /> EcoTrace
        </div>
        <SidebarNav />
      </aside>
      <main className="min-w-0 flex-1 p-6">{children}</main>
    </div>
  );
}
```

- [ ] **Step 5: Wire the layout**

Create `src/app/(dashboard)/layout.tsx`:

```tsx
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx playwright test -g "sidebar shows the five sections"`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/dashboard "src/app/(dashboard)/layout.tsx"
git commit -m "feat(dashboard): shell + sidebar nav + route-group layout"
```

---

## Task 5: Shared primitives — StatusBadge + MetricCard

**Files:**
- Create: `src/components/dashboard/status-badge.tsx`
- Create: `src/components/dashboard/metric-card.tsx`

- [ ] **Step 1: Build StatusBadge**

Create `src/components/dashboard/status-badge.tsx`:

```tsx
import { cn } from "@/lib/utils";
import type { RouteStatus } from "@/lib/dashboard";

const styles: Record<RouteStatus, string> = {
  ok: "bg-accent/10 text-accent-foreground",
  anomaly: "bg-amber-100 text-amber-800",
  overload: "bg-red-100 text-red-800",
};
const labels: Record<RouteStatus, string> = { ok: "OK", anomaly: "Anomaly", overload: "Overload" };

export function StatusBadge({ status }: { status: RouteStatus }) {
  return (
    <span className={cn("inline-block rounded-full px-2 py-0.5 text-xs", styles[status])}>
      {labels[status]}
    </span>
  );
}
```

- [ ] **Step 2: Build MetricCard**

Create `src/components/dashboard/metric-card.tsx`:

```tsx
export function MetricCard({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-md bg-muted/50 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-medium">
        {value}
        {unit ? <span className="ml-1 text-xs text-muted-foreground">{unit}</span> : null}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/status-badge.tsx src/components/dashboard/metric-card.tsx
git commit -m "feat(dashboard): StatusBadge + MetricCard primitives"
```

---

## Task 6: Overview page (charts + full layered view)

**Files:**
- Create: `src/components/dashboard/co2e-trend-chart.tsx`
- Create: `src/components/dashboard/segment-breakdown.tsx`
- Modify: `src/app/(dashboard)/dashboard/page.tsx`
- Modify: `tests/e2e/dashboard.spec.ts`

- [ ] **Step 1: Write the failing Overview test**

Replace the "Overview" describe block in `tests/e2e/dashboard.spec.ts` with:

```ts
test.describe("Overview", () => {
  test("shows measured hero, average-factor comparison, metrics and compliance", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Measured CO₂e", { exact: false })).toBeVisible();
    await expect(page.getByText("1,247")).toBeVisible();
    await expect(page.getByText("+11.6%")).toBeVisible();
    await expect(page.getByText("±0.43%").first()).toBeVisible();
    await expect(page.getByText("ISO 14083")).toBeVisible();
    await expect(page.getByText("Standard HGV")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test -g "shows measured hero"`
Expected: FAIL — placeholder page only renders "Measured CO₂e".

- [ ] **Step 3: Build the trend chart (client)**

Create `src/components/dashboard/co2e-trend-chart.tsx`:

```tsx
"use client";
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts";
import type { MonthlyPoint } from "@/lib/dashboard";

export function Co2eTrendChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
        <Area type="monotone" dataKey="co2eT" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.12} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

- [ ] **Step 4: Build the segment breakdown**

Create `src/components/dashboard/segment-breakdown.tsx`:

```tsx
import type { Segment } from "@/lib/dashboard";

export function SegmentBreakdown({ segments }: { segments: Segment[] }) {
  return (
    <div className="text-sm">
      {segments.map((s) => (
        <div key={s.name} className="mb-2.5">
          <div className="mb-1 flex justify-between">
            <span>{s.name}</span>
            <span className="text-muted-foreground">{s.sharePct}%</span>
          </div>
          <div className="h-1.5 rounded bg-muted">
            <div className="h-1.5 rounded bg-accent" style={{ width: `${s.sharePct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Build the Overview page**

Replace `src/app/(dashboard)/dashboard/page.tsx`:

```tsx
import { getDashboardData } from "@/lib/dashboard";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Co2eTrendChart } from "@/components/dashboard/co2e-trend-chart";
import { SegmentBreakdown } from "@/components/dashboard/segment-breakdown";

export default function OverviewPage() {
  const { summary, segments, monthly, compliance } = getDashboardData();
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xs text-muted-foreground">Measured CO₂e · fleet total</div>
          <div className="text-3xl font-medium">
            {summary.measuredCo2eT.toLocaleString()} <span className="text-base text-muted-foreground">t CO₂e</span>
          </div>
        </div>
        <div className="text-right">
          <span className="rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent-foreground">
            measured ±{summary.precisionPct}%
          </span>
          <div className="mt-1.5 text-xs text-muted-foreground">
            Average factors would report{" "}
            <span className="font-medium text-foreground">{summary.avgFactorCo2eT.toLocaleString()} t</span>{" "}
            <span className="text-red-700">(+{summary.avgFactorDeltaPct}%)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <MetricCard label="Intensity" value={String(summary.intensity)} unit="gCO₂e/t·km" />
        <MetricCard label="Data precision" value={`±${summary.precisionPct}%`} />
        <MetricCard label="Coverage" value={summary.routesAnalysed.toLocaleString()} unit="routes" />
        <MetricCard label="Anomalies" value={String(summary.anomalies)} unit="flagged" />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="mr-1 text-muted-foreground">Compliance:</span>
        {compliance.map((c) => (
          <span key={c.name} className="rounded-full border border-accent/30 px-2 py-0.5 text-accent-foreground">
            ✓ {c.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border p-3">
          <div className="mb-2 text-xs text-muted-foreground">Monthly CO₂e (t)</div>
          <Co2eTrendChart data={monthly} />
        </div>
        <div className="rounded-lg border p-3">
          <div className="mb-2.5 text-xs text-muted-foreground">By fleet segment</div>
          <SegmentBreakdown segments={segments} />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="rounded-md border border-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
          Download audit report (PDF)
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx playwright test -g "shows measured hero"`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/dashboard "src/app/(dashboard)/dashboard/page.tsx" tests/e2e/dashboard.spec.ts
git commit -m "feat(dashboard): overview page (hero, metrics, compliance chips, charts)"
```

---

## Task 7: Compliance page

**Files:**
- Create: `src/components/dashboard/compliance-cards.tsx`
- Create: `src/components/dashboard/provenance-panel.tsx`
- Create: `src/components/dashboard/reports-list.tsx`
- Create: `src/app/(dashboard)/dashboard/compliance/page.tsx`
- Modify: `tests/e2e/dashboard.spec.ts`

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/dashboard.spec.ts`:

```ts
test.describe("Compliance", () => {
  test("shows frameworks, provenance and reports", async ({ page }) => {
    await page.goto("/dashboard/compliance");
    await expect(page.getByText("GLEC Framework v3")).toBeVisible();
    await expect(page.getByText("Omega Engine · physics-informed NN")).toBeVisible();
    await expect(page.getByText("Scope 3 transport emissions report")).toBeVisible();
    await expect(page.getByText("Verified").first()).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test -g "shows frameworks, provenance and reports"`
Expected: FAIL — route 404.

- [ ] **Step 3: Build compliance-cards**

Create `src/components/dashboard/compliance-cards.tsx`:

```tsx
import type { ComplianceFramework, ComplianceStatus } from "@/lib/dashboard";

const statusText: Record<ComplianceStatus, string> = { verified: "Verified", ready: "Ready", draft: "Draft" };
const statusClass: Record<ComplianceStatus, string> = {
  verified: "text-accent-foreground", ready: "text-accent-foreground", draft: "text-amber-700",
};

export function ComplianceCards({ frameworks }: { frameworks: ComplianceFramework[] }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {frameworks.map((f) => (
        <div key={f.name} className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{f.name}</span>
            <span className={`text-xs ${statusClass[f.status]}`}>{statusText[f.status]}</span>
          </div>
          <div className="mt-1.5 text-xs text-muted-foreground">{f.detail}</div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Build provenance-panel**

Create `src/components/dashboard/provenance-panel.tsx`:

```tsx
export function ProvenancePanel({ items }: { items: string[] }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <div className="mb-2 text-sm font-medium">Methodology & data provenance</div>
      <div className="flex flex-wrap gap-1.5 text-xs">
        {items.map((i) => (
          <span key={i} className="rounded-full border bg-background px-2 py-0.5">{i}</span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Build reports-list**

Create `src/components/dashboard/reports-list.tsx`:

```tsx
import { Download } from "lucide-react";
import type { ReportItem } from "@/lib/dashboard";

export function ReportsList({ reports }: { reports: ReportItem[] }) {
  return (
    <div className="divide-y rounded-lg border text-sm">
      {reports.map((r) => (
        <div key={r.name} className="flex items-center justify-between px-3 py-2.5">
          <span>{r.name}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {r.format} · {r.date}
            <Download className="size-4 text-accent" aria-hidden />
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Build the Compliance page**

Create `src/app/(dashboard)/dashboard/compliance/page.tsx`:

```tsx
import { getDashboardData } from "@/lib/dashboard";
import { ComplianceCards } from "@/components/dashboard/compliance-cards";
import { ProvenancePanel } from "@/components/dashboard/provenance-panel";
import { ReportsList } from "@/components/dashboard/reports-list";

export default function CompliancePage() {
  const { compliance, provenance, reports } = getDashboardData();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Compliance & reporting</h1>
        <span className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-foreground">Assurance-ready</span>
      </div>
      <ComplianceCards frameworks={compliance} />
      <ProvenancePanel items={provenance} />
      <div>
        <div className="mb-2 text-sm font-medium">Auditable reports</div>
        <ReportsList reports={reports} />
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npx playwright test -g "shows frameworks, provenance and reports"`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/components/dashboard "src/app/(dashboard)/dashboard/compliance" tests/e2e/dashboard.spec.ts
git commit -m "feat(dashboard): compliance page (frameworks, provenance, reports)"
```

---

## Task 8: Operations page

**Files:**
- Create: `src/components/dashboard/intensity-bars.tsx`
- Create: `src/components/dashboard/routes-table.tsx`
- Create: `src/app/(dashboard)/dashboard/operations/page.tsx`
- Modify: `tests/e2e/dashboard.spec.ts`

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/dashboard.spec.ts`:

```ts
test.describe("Operations", () => {
  test("shows intensity bars and a routes table with flags", async ({ page }) => {
    await page.goto("/dashboard/operations");
    await expect(page.getByText("City · high traffic")).toBeVisible();
    await expect(page.getByText("Hull → Bristol")).toBeVisible();
    await expect(page.getByText("Anomaly")).toBeVisible();
    await expect(page.getByText("Overload")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test -g "shows intensity bars"`
Expected: FAIL — route 404.

- [ ] **Step 3: Build intensity-bars**

Create `src/components/dashboard/intensity-bars.tsx`:

```tsx
import type { RouteTypeIntensity } from "@/lib/dashboard";

export function IntensityBars({ data }: { data: RouteTypeIntensity[] }) {
  const max = Math.max(...data.map((d) => d.intensity), 1);
  return (
    <div className="text-sm">
      {data.map((d) => (
        <div key={d.type} className="mb-2 flex items-center gap-2">
          <span className="w-32 shrink-0">{d.type}</span>
          <div className="h-3.5 flex-1 rounded bg-muted">
            <div className="h-3.5 rounded bg-accent" style={{ width: `${Math.round((d.intensity / max) * 100)}%` }} />
          </div>
          <span className="w-8 text-right text-muted-foreground">{d.intensity}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Build routes-table**

Create `src/components/dashboard/routes-table.tsx`:

```tsx
import { StatusBadge } from "./status-badge";
import type { RouteRow } from "@/lib/dashboard";

export function RoutesTable({ routes }: { routes: RouteRow[] }) {
  return (
    <div className="overflow-hidden rounded-lg border text-sm">
      <div className="grid grid-cols-[1.7fr_1fr_0.6fr_0.7fr_0.8fr] gap-2 bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <span>Route</span><span>Vehicle</span><span className="text-right">km</span><span className="text-right">t CO₂e</span><span className="text-right">Status</span>
      </div>
      {routes.map((r) => (
        <div key={r.id} className="grid grid-cols-[1.7fr_1fr_0.6fr_0.7fr_0.8fr] gap-2 border-t px-3 py-2">
          <span>{r.origin} → {r.destination}</span>
          <span className="text-muted-foreground">{r.vehicle}</span>
          <span className="text-right">{r.km}</span>
          <span className="text-right">{r.co2eT}</span>
          <span className="text-right"><StatusBadge status={r.status} /></span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Build the Operations page**

Create `src/app/(dashboard)/dashboard/operations/page.tsx`:

```tsx
import { getDashboardData } from "@/lib/dashboard";
import { MetricCard } from "@/components/dashboard/metric-card";
import { IntensityBars } from "@/components/dashboard/intensity-bars";
import { RoutesTable } from "@/components/dashboard/routes-table";

export default function OperationsPage() {
  const { summary, routeTypeIntensity, routes } = getDashboardData();
  const overloads = routes.filter((r) => r.status === "overload").length;
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Operations</h1>
      <div className="grid grid-cols-3 gap-2">
        <MetricCard label="Routes analysed" value={summary.routesAnalysed.toLocaleString()} />
        <MetricCard label="Avg intensity" value={String(summary.intensity)} unit="gCO₂e/t·km" />
        <MetricCard label="Flagged" value={`${summary.anomalies} anomaly · ${overloads} overload`} />
      </div>
      <div className="rounded-lg border p-3">
        <div className="mb-2.5 text-xs text-muted-foreground">Intensity by route type (gCO₂e/t·km)</div>
        <IntensityBars data={routeTypeIntensity} />
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">Highest-intensity routes</div>
        <RoutesTable routes={routes} />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx playwright test -g "shows intensity bars"`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/dashboard "src/app/(dashboard)/dashboard/operations" tests/e2e/dashboard.spec.ts
git commit -m "feat(dashboard): operations page (intensity bars + routes table with flags)"
```

---

## Task 9: Fleet & routes page

**Files:**
- Create: `src/app/(dashboard)/dashboard/fleet/page.tsx`
- Modify: `tests/e2e/dashboard.spec.ts`

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/dashboard.spec.ts`:

```ts
test.describe("Fleet", () => {
  test("shows vehicle inventory and a map placeholder", async ({ page }) => {
    await page.goto("/dashboard/fleet");
    await expect(page.getByText("HGV-018")).toBeVisible();
    await expect(page.getByText("Route map")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test -g "shows vehicle inventory"`
Expected: FAIL — route 404.

- [ ] **Step 3: Build the Fleet page (inventory table + styled map placeholder)**

Create `src/app/(dashboard)/dashboard/fleet/page.tsx`:

```tsx
import { getDashboardData } from "@/lib/dashboard";
import { StatusBadge } from "@/components/dashboard/status-badge";

export default function FleetPage() {
  const { vehicles } = getDashboardData();
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Fleet & routes</h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr]">
        <div className="overflow-hidden rounded-lg border text-sm">
          <div className="grid grid-cols-[1fr_1fr_0.7fr_0.7fr] gap-2 bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
            <span>Vehicle</span><span>Segment</span><span className="text-right">Intensity</span><span className="text-right">Status</span>
          </div>
          {vehicles.map((v) => (
            <div key={v.id} className="grid grid-cols-[1fr_1fr_0.7fr_0.7fr] gap-2 border-t px-3 py-2">
              <span>{v.id}</span>
              <span className="text-muted-foreground">{v.segment}</span>
              <span className="text-right">{v.intensity}</span>
              <span className="text-right"><StatusBadge status={v.status} /></span>
            </div>
          ))}
        </div>
        <div className="flex min-h-56 items-center justify-center rounded-lg border bg-muted/30 text-sm text-muted-foreground">
          Route map
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx playwright test -g "shows vehicle inventory"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(dashboard)/dashboard/fleet" tests/e2e/dashboard.spec.ts
git commit -m "feat(dashboard): fleet & routes page (inventory + map placeholder)"
```

---

## Task 10: Reports page

**Files:**
- Create: `src/app/(dashboard)/dashboard/reports/page.tsx`
- Modify: `tests/e2e/dashboard.spec.ts`

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/dashboard.spec.ts`:

```ts
test.describe("Reports", () => {
  test("lists generated reports", async ({ page }) => {
    await page.goto("/dashboard/reports");
    await expect(page.getByText("ISO 14083 methodology statement")).toBeVisible();
    await expect(page.getByRole("button", { name: "Generate report" })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test -g "lists generated reports"`
Expected: FAIL — route 404.

- [ ] **Step 3: Build the Reports page (reuses ReportsList)**

Create `src/app/(dashboard)/dashboard/reports/page.tsx`:

```tsx
import { getDashboardData } from "@/lib/dashboard";
import { ReportsList } from "@/components/dashboard/reports-list";

export default function ReportsPage() {
  const { reports } = getDashboardData();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Reports</h1>
        <button className="rounded-md border border-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
          Generate report
        </button>
      </div>
      <ReportsList reports={reports} />
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx playwright test -g "lists generated reports"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(dashboard)/dashboard/reports" tests/e2e/dashboard.spec.ts
git commit -m "feat(dashboard): reports page"
```

---

## Task 11: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run the whole e2e suite**

Run: `npm run test:e2e`
Expected: all tests PASS.

- [ ] **Step 2: Run lint + typecheck + build**

Run: `npm run check`
Expected: PASS (no lint errors, no type errors, production build succeeds).

- [ ] **Step 3: Manual visual pass**

Run: `npm run dev`, open `http://localhost:3000/dashboard`, click through all five sections. Confirm the views match the approved mockups (hero comparison, compliance frameworks, operations flags, fleet inventory, reports). Fix any visual drift before finishing.

- [ ] **Step 4: Final commit (if visual fixes were needed)**

```bash
git add -A
git commit -m "chore(dashboard): visual pass against approved mockups"
```

---

## Self-Review

- **Spec coverage:** Overview §5.1 → Task 6; Compliance §5.2 → Task 7; Operations §5.3 → Task 8; Fleet §5.4 → Task 9; Reports §5.5 → Task 10; IA/shell §3 → Task 4; visual direction §4 → Tasks 2/4/brand tokens; mock-data model §6 → Task 3; technical approach §7 (route group + selector seam + shadcn + recharts) → Tasks 1–3. All covered.
- **Deferred (per spec §8, intentionally not in plan):** auth, live APIs, real report generation, i18n, real map tiles (Fleet uses a placeholder).
- **Type consistency:** `getDashboardData()`, `RouteStatus`, `DashboardData` fields used in pages match `types.ts`. `StatusBadge`/`MetricCard`/`ReportsList` signatures match their call sites.
- **Open items from spec §10:** map = placeholder (decided in Task 9); fleet segment names fixed in mock-data (Task 3).

*EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL*
