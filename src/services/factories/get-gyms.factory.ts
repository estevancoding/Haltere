import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { GetGymsService } from "../get-gyms.service";

export default function getGymsFactory() {
  const prismaGyms = new PrismaGymsRepository();
  const getGyms = new GetGymsService(prismaGyms);

  return { getGyms };
}
