import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "../auth.config";
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(c) {
        const account = await db.clientAccount.findUnique({ where: { email: String(c?.email) } });
        if (!account) return null;
        const ok = await bcrypt.compare(String(c?.password), account.password);
        return ok ? { id: account.id, email: account.email, clientName: account.clientName } : null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) { if (user) token.clientName = (user as any).clientName; return token; },
    session({ session, token }) { (session.user as any).clientName = token.clientName; return session; },
  },
});
