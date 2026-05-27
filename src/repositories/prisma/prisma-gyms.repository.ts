import { prisma } from "@/lib/prisma";
import type { Gym } from "../../../prisma/generated/client";
import type { GymCreateInput } from "../../../prisma/generated/models";
import type { FindManyNearbyParams, GymsRepository } from "../gyms.repository";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async create(data: GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async findMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371000 * acos( cos( radians(${latitude}) ) * cos( radians( latitude::float ) ) * cos( radians( longitude::float ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude::float ) ) ) ) <= 10000
    `;

    return gyms;
  }
}
