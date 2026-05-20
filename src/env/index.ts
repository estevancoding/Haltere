import "dotenv/config";
import z from "zod";

enum Environment {
  development = "development",
  production = "production",
  test = "test",
}

const envSchema = z.object({
  NODE_ENV: z.enum(Environment).default(Environment.production),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  const tree = z.treeifyError(_env.error);

  throw new Error(
    `Invalid environment variables! \n ${JSON.stringify(tree, null, 2)}`,
  );
}

export const env = _env.data;
