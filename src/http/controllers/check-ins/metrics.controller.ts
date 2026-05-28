import getUserMetricsFactory from "@/services/factories/get-user-metrics.factory";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  const { getUserMetrics } = getUserMetricsFactory();

  const { checkInsCount } = await getUserMetrics.execute({
    userId: req.user.sub,
  });

  return res.status(200).send({
    checkInsCount,
  });
}
