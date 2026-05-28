import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";
import type { Environment } from "vitest/environments";

function generateDBURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("please provide a database URL env variable");
  }
  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default {
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDBURL(schema);

    process.env.DATABASE_URL = databaseUrl;

    execSync("pnpm dlx prisma migrate deploy");

    const pool = new Pool({ connectionString: databaseUrl });

    const adapter = new PrismaPg(pool, { schema });
    const prisma = new PrismaClient({ adapter });

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        await prisma.$disconnect();
      },
    };
  },
} as Environment;
