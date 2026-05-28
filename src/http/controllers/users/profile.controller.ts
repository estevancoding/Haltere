import getUserFactory from "@/services/factories/get-user.factory";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, res: FastifyReply) {

  const { getUser } = getUserFactory();

  const { user } = await getUser.execute({
    userId: req.user.sub,
  });

  return res.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
