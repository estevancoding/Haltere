import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { CreateUserService } from "../create-user.service";

export default function createUserFactory() {
  const prismaUsers = new PrismaUsersRepository();
  const createUser = new CreateUserService(prismaUsers);

  return { createUser };
}
