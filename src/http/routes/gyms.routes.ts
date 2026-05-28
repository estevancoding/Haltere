import { type FastifyInstance } from "fastify";
import { jwtAuthentication } from "../middlewares/jwt-authentication";
import { search } from "../controllers/gyms/search.controller";
import { nearby } from "../controllers/gyms/nearby.controller";
import { create } from "../controllers/gyms/create.controller";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtAuthentication);

  app.post("/gyms", create);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
}
