import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { GetNearbyGymsService } from "../get-nearby-gyms.service";

export default function getNearbyGymsFactory() {
  const prismaGyms = new PrismaGymsRepository();
  const getNearbyGyms = new GetNearbyGymsService(prismaGyms);

  return { getNearbyGyms };
}
