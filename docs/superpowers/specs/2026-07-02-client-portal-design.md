# Design Spec — Client Portal (Sub-project 2: real per-client accounts)

Status: APPROVED design · Date: 2026-07-02 · Repo: `ecotrace-web`
Programme: "2 demo clients, 10 real operations each" — sub-project 2 of 4
(1 data pipeline (done) → **2 client portal** → 3 ecotrace-ops reflection (free) → 4 go-live).

---

## 1. Objective

A real, customer-facing dashboard at **`/portal`** where each demo client (Meridian Haulage Ltd,
Northbridge Logistics) logs in with their own account and sees **only their own** certified
operations — reusing the exact certificate UI already built (map, ECI/VCI, per-SKU, PDF download,
trust block) and the exact 20 real certificates from sub-project 1.

**Explicitly separate from `/dashboard`**: the existing `/dashboard` tree (shared Basic-auth
password, mock fleet KPIs, already merged/live) is untouched. `/portal` is new, additive, and the
only thing that changes in `/dashboard` is nothing.

## 2. Architecture

- **DB:** Postgres on **Neon** (Vercel-native, free tier). Prisma with the `@prisma/adapter-pg`
  driver-adapter pattern already validated in `ecotrace-ops` (Prisma 7's WASM engine requires it).
- **Auth:** Auth.js v5, credentials provider (email + bcrypt password), JWT sessions, `trustHost: true`
  (avoids the `UntrustedHost` error hit and fixed in `ecotrace-ops`). Gate is **per-page**
  (`requireSession()` at the top of each `/portal/*` page), not middleware — middleware + Prisma's
  pg adapter don't run on the edge runtime, confirmed the hard way in `ecotrace-ops`.
- **Data:** certificates are **not** migrated into the DB. They stay the existing exported
  `src/lib/certificates/{op_id}.ts` modules (`CertRecord`, already carrying `facts.operator`). The
  only DB table is `ClientAccount`. Portal pages call `getAllCertRecords()` (already exists) and
  filter by `record.facts?.operator === session.user.clientName`.

### Data model (Prisma)
```prisma
model ClientAccount {
  id          String   @id @default(cuid())
  email       String   @unique
  password    String   // bcrypt hash
  clientName  String   // must exactly match CertRecord.facts.operator
  createdAt   DateTime @default(now())
}
```
Auth.js JWT/session tables are NOT needed (JWT strategy, no DB-backed sessions — same choice as
`ecotrace-ops`).

## 3. Screens

- **`/portal/login`** — email + password form (styled to match the existing verify-page /
  dashboard navy/IBM-Plex theme).
- **`/portal`** — list of the logged-in client's operations. Reuses the row layout from
  `/dashboard/certificates` (ECI badge, VCI status, CO₂e, route) filtered to the session's client.
- **`/portal/[opId]`** — operation detail. **Reuses the existing detail page component** (hero
  CO₂e + ISO badge, ECI A–G, VCI gauge, route map, per-SKU, Trust & Verification with the RFC 3161
  wording, PDF download, public verify link) — server-side ownership check: 404 if the requested
  `opId`'s `facts.operator` doesn't match the session's `clientName` (never leak another client's
  operation by guessing a URL).
- **Logout** control in the portal header.

## 4. Seed data

Two seeded `ClientAccount` rows (script, run once against the Neon DB):
- `meridian@ecotrace-demo.local` → clientName `"Meridian Haulage Ltd"`
- `northbridge@ecotrace-demo.local` → clientName `"Northbridge Logistics"`
Passwords generated and given to the user out-of-band (not committed to the repo).

## 5. Error handling

- Unauthenticated → redirect to `/portal/login`.
- Wrong credentials → inline error on the login form, no user enumeration (generic message).
- Authenticated but requesting another client's `opId` → `notFound()` (404), not a 403 (don't
  confirm the ID exists).
- No operations found for a client (shouldn't happen post-seed, but handled) → empty state.

## 6. Testing

- `tsc --noEmit` clean, `next build` green.
- Manual: log in as Meridian → see exactly 10 ops (op1000–op1009), none from Northbridge; same
  in reverse. Attempt to load a Northbridge `opId` while logged in as Meridian → 404.
- Confirm `/dashboard` (old area) is byte-for-byte unaffected (no shared files edited beyond the
  reused, unmodified certificate-detail component being imported, not changed).

## 7. Deliverables

`prisma/schema.prisma` (+ migration) for `ClientAccount`; `src/lib/db.ts`, `src/lib/auth.ts`,
`src/lib/rbac.ts` (session guard only, no roles) — ported from `ecotrace-ops`; seed script;
`/portal/login`, `/portal`, `/portal/[opId]` pages; `DATABASE_URL`/`AUTH_SECRET` env vars
(local `.env` + later Vercel env for go-live in sub-project 4).

## 8. Acceptance criteria

1. `next build` succeeds; `/portal`, `/portal/login`, `/portal/[opId]` routes exist.
2. Logging in as Meridian shows exactly the 10 `op1000–op1009` certificates; Northbridge shows
   exactly `op1010–op1019`. Cross-client `opId` access returns 404.
3. `/dashboard` and its existing routes are unmodified and still build/behave identically.
4. No hardcoded credentials in source; passwords only in the seed script's runtime input / env.

---

*EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL*
