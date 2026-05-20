import { type FastifyInstance } from "fastify";
import { register } from "../controllers/register.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", register);
}
