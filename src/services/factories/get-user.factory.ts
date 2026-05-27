import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { GetUserService } from "../get-user.service";

export default function getUserFactory() {
  const prismaUsers = new PrismaUsersRepository();
  const getUser = new GetUserService(prismaUsers);

  return { getUser };
}
