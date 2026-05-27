import type { CheckIn } from "../../prisma/generated/client";
import type { CheckInsRepository } from "@/repositories/check-ins.repository";

interface GetUserCheckInsRequest {
  userId: string;
  page: number;
}

interface GetUserCheckInsResponse {
  checkIns: CheckIn[];
}

export class GetUserCheckInsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: GetUserCheckInsRequest): Promise<GetUserCheckInsResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}
