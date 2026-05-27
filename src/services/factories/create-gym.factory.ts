import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { CreateGymsService } from "../create-gym.service";

export default function createGymFactory() {
  const prismaGyms = new PrismaGymsRepository();
  const createGym = new CreateGymsService(prismaGyms);

  return { createGym };
}
