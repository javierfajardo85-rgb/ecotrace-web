// Prisma 7's WASM compiler engine requires a Driver Adapter rather than a bare
// connection string — same pattern already validated in ecotrace-ops.
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function makeClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set — cannot create PrismaClient.");
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

const g = globalThis as unknown as { prismaPortal?: PrismaClient };
export const db = g.prismaPortal ?? makeClient();
if (process.env.NODE_ENV !== "production") g.prismaPortal = db;
