import { type FastifyInstance } from "fastify";
import { jwtAuthentication } from "../middlewares/jwt-authentication";
import { create } from "../controllers/check-ins/create.controller";
import { validate } from "../controllers/check-ins/validate.controller";
import { metrics } from "../controllers/check-ins/metrics.controller";
import { history } from "../controllers/check-ins/history.controller";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtAuthentication);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", create);

  app.patch("/check-ins/:checkInId/validate", validate);
}
