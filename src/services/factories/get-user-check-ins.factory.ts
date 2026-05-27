import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { GetUserCheckInsService } from "../get-user-check-ins.service";

export default function getUserCheckInsFactory() {
  const prismaCheckIns = new PrismaCheckInsRepository();
  const getUserCheckIns = new GetUserCheckInsService(prismaCheckIns);

  return { getUserCheckIns };
}
