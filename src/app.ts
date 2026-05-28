import fastify from "fastify";
import { usersRoutes } from "./http/routes/users.routes";
import z, { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./http/routes/gyms.routes";
import { checkInsRoutes } from "./http/routes/check-ins.routes";

export const app = fastify({
  logger: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validation error", issues: z.treeifyError(error) });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } 

  return res.status(500).send({ message: "Internal Server Error" });
});
