import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { CreateUserService } from "../create-user.service";

export function createUserFactory() {
  const usersRepository = new PrismaUsersRepository();
  const createUserService = new CreateUserService(usersRepository);

  return { createUserService };
}
