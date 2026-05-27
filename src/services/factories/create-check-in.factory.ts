import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { CreateCheckInService } from "../create-check-in.service";

export default function createCheckInFactory() {
  const prismaCheckIns = new PrismaCheckInsRepository();
  const prismaGyms = new PrismaGymsRepository();
  const createCheckIn = new CreateCheckInService(prismaCheckIns, prismaGyms);

  return { createCheckIn };
}
