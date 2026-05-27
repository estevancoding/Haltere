import type { Gym } from "../../prisma/generated/client";
import type { GymsRepository } from "@/repositories/gyms.repository";

interface GetGymsRequest {
  query: string;
  page: number;
}

interface GetGymsResponse {
  gyms: Gym[];
}

export class GetGymssService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: GetGymsRequest): Promise<GetGymsResponse> {
    const gyms = await this.gymsRepository.findMany(query, page);

    return {
      gyms,
    };
  }
}
