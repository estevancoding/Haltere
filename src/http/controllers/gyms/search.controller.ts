import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import getGymsFactory from "@/services/factories/get-gyms.factory";

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, q: query } = searchGymQuerySchema.parse(req.query);

  const { getGyms } = getGymsFactory();

  const { gyms } = await getGyms.execute({ page, query });

  return res.status(200).send({ gyms });
}
