import dayjs from "dayjs";
import type { CheckIn } from "../../prisma/generated/client";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation.error";
import type { CheckInsRepository } from "@/repositories/check-ins.repository";

interface AuthenticateCheckInRequest {
  checkInId: string;
}

interface AuthenticateCheckInResponse {
  checkIn: CheckIn;
}

export class AuthenticateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: AuthenticateCheckInRequest): Promise<AuthenticateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError("check in");
    }

    const elapsedMinutesSinceCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );

    if (elapsedMinutesSinceCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
