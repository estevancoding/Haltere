import type { FastifyReply, FastifyRequest } from "fastify";

export async function jwtAuthentication(
  req: FastifyRequest,
  res: FastifyReply,
) {
  try {
    await req.jwtVerify();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized", Error: err });
  }
}
