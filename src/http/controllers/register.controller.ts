import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users.repository";
import { CreateUserService } from "../../services/create-user.service";

const usersRepository = new PrismaUsersRepository();
const createUserService = new CreateUserService(usersRepository);

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    await createUserService.create({ name, email, password });
  } catch (err) {
    return res.status(409).send(err);
  }

  return res.status(201).send();
}
