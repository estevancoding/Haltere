import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateUserService } from "../authenticate-user.service";

export default function authenticateUserFactory() {
  const prismaUsers = new PrismaUsersRepository();
  const authenticateUser = new AuthenticateUserService(prismaUsers);

  return { authenticateUser };
}
