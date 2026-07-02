import type { NextAuthConfig } from "next-auth";

// Edge-safe Auth.js config (no DB, no providers needing Node). The full config
// (Credentials + Prisma) lives in src/lib/auth.ts and spreads this.
export const authConfig = {
  trustHost: true,
  pages: { signIn: "/portal/login" },
  providers: [],
} satisfies NextAuthConfig;
