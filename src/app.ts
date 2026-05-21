import fastify from "fastify";
import { usersRoutes } from "./http/routes/users.routes";
import z, { ZodError } from "zod";
import { env } from "./env";

export const app = fastify({
  logger: true,
});

app.register(usersRoutes);

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validation error", issues: z.treeifyError(error) });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    //todo
  }

  return res.status(500).send({ message: "Internal Server Error" });
});
