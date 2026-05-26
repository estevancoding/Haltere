import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateService } from "../authenticate.service";

export function authenticateFactory() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUserService = new AuthenticateService(usersRepository);

  return { authenticateUserService };
}
