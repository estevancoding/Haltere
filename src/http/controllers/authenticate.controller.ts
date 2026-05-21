import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateService } from "@/services/authenticate.service";
import { InvalidCredentialError } from "@/services/errors/invalid-credentials.error";

const usersRepository = new PrismaUsersRepository();
const authenticateUserService = new AuthenticateService(usersRepository);

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    await authenticateUserService.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return res.status(409).send({ message: err.message });
    }
    throw err; //repassando o erro para a tratativa de erro do fastify
  }

  return res.status(200).send();
}
