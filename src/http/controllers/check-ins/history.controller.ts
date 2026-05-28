import getUserCheckInsFactory from "@/services/factories/get-user-check-ins.factory";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.query);

  const { getUserCheckIns } = getUserCheckInsFactory();

  const { checkIns } = await getUserCheckIns.execute({
    page,
    userId: req.user.sub,
  });

  return res.status(200).send({
    checkIns,
  });
}
