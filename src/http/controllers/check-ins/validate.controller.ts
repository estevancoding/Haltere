import authenticateCheckInFactory from "@/services/factories/authenticate-check-in.factory";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(req.params);

  const { authenticateCheckIn } = authenticateCheckInFactory();

  await authenticateCheckIn.execute({
    checkInId,
  });

  return res.status(204).send();
}
