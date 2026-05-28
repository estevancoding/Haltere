import { type FastifyInstance } from "fastify";
import { register } from "../controllers/users/register.controller";
import { authenticate } from "../controllers/users/authenticate.controller";
import { profile } from "../controllers/users/profile.controller";
import { jwtAuthentication } from "../middlewares/jwt-authentication";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  //authenticated routes
  app.get("/me", { onRequest: jwtAuthentication }, profile);
}
