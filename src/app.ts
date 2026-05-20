import fastify from "fastify";
import { userRoutes } from "./http/routes/user.routes";

export const app = fastify({
  logger: true,
});

app.register(userRoutes);
