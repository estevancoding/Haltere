import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/client";
import { env } from "@/env";

const connectionString = `${env.DATABASE_URL}`;
const schema = new URL(connectionString).searchParams.get("schema") ?? "public";

const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool, { schema });
export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "development" ? ["query"] : [],
});
