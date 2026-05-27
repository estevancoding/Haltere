import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateUserService } from "../authenticate-user.service";

export function authenticateUserFactory() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUserService = new AuthenticateUserService(usersRepository);

  return { authenticateUserService };
}
