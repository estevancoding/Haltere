import type { Gym } from "../../prisma/generated/client";
import type { GymsRepository } from "@/repositories/gyms.repository";

interface GetNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface GetNearbyGymsResponse {
  gyms: Gym[];
}

export class GetNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GetNearbyGymsRequest): Promise<GetNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
