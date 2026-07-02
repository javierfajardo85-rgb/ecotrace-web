import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import bcrypt from "bcryptjs";
import { db } from "../src/lib/db";

// Two demo client accounts (sub-project 2). Passwords come from env so they are
// never committed; falls back to a printed random password for local dev.
async function upsertAccount(email: string, clientName: string, passwordEnvVar: string) {
  const password = process.env[passwordEnvVar] ?? Math.random().toString(36).slice(2, 12);
  const hash = await bcrypt.hash(password, 10);
  await db.clientAccount.upsert({
    where: { email },
    create: { email, clientName, password: hash },
    update: { clientName, password: hash },
  });
  console.log(`seeded ${email} (${clientName})${process.env[passwordEnvVar] ? "" : ` — password: ${password}`}`);
}

async function main() {
  await upsertAccount("meridian@ecotrace-demo.local", "Meridian Haulage Ltd", "SEED_MERIDIAN_PASSWORD");
  await upsertAccount("northbridge@ecotrace-demo.local", "Northbridge Logistics", "SEED_NORTHBRIDGE_PASSWORD");
}

main().finally(() => db.$disconnect());
