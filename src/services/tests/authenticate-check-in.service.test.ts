import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { AuthenticateCheckInService } from "../authenticate-check-in.service";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";
import { LateCheckInValidationError } from "../errors/late-check-in-validation.error";

let inMemoryCheckIns: InMemoryCheckInsRepository;
let sut: AuthenticateCheckInService;

describe("Authenticate Check-in Service", () => {
  beforeEach(async () => {
    inMemoryCheckIns = new InMemoryCheckInsRepository();
    sut = new AuthenticateCheckInService(inMemoryCheckIns);

    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 4, 23, 8, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to validate a check-in", async () => {
    const createdCheckIn = await inMemoryCheckIns.create({
      gym_id: "Gym Test",
      user_id: "User Test",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckIns.items[0]?.validated_at).toEqual(expect.any(Date));
  });

  it("Should not be able to validate a non-existent check-in", async () => {
    await expect(
      async () =>
        await sut.execute({
          checkInId: "inexistent",
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should not be able to validate a check-in more than 20 minutes after its creation", async () => {
    const createdCheckIn = await inMemoryCheckIns.create({
      gym_id: "Gym Test",
      user_id: "User Test",
    });

    const EXCEEDED_TIME = 1000 * 60 * 21;

    vi.advanceTimersByTime(EXCEEDED_TIME);

    await expect(
      async () =>
        await sut.execute({
          checkInId: createdCheckIn.id,
        }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
