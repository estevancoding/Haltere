import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { CheckInService } from "../create-check-in.service";
import { randomUUID } from "node:crypto";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";
import { Decimal } from "@prisma/client/runtime/client";
import { MaxNumberOfCheckInsError } from "../errors/max-check-ins.error";
import { MaxDistanceError } from "../errors/max-distance.error";

let inMemoryCheckIns: InMemoryCheckInsRepository;
let sut: CheckInService;
let inMemoryGyms: InMemoryGymsRepository;
const userId = randomUUID();
const gymId = randomUUID();

describe("Create Check-in Service", () => {
  beforeEach(async () => {
    inMemoryCheckIns = new InMemoryCheckInsRepository();
    inMemoryGyms = new InMemoryGymsRepository();
    sut = new CheckInService(inMemoryCheckIns, inMemoryGyms);

    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 4, 23, 8, 0, 0));

    await inMemoryGyms.create({
      id: gymId,
      title: "Gym Test 01",
      description: null,
      phone: null,
      latitude: -23.478038,
      longitude: -46.667582,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId,
      userId,
      userLatitude: -23.478038,
      userLongitude: -46.667582,
    });

    expect(checkIn);
  });

  it("Should not be able to check in twice on the same day", async () => {
    const userId = randomUUID();

    await sut.execute({
      gymId,
      userId,
      userLatitude: -23.478038,
      userLongitude: -46.667582,
    });

    await expect(
      async () =>
        await sut.execute({
          gymId,
          userId,
          userLatitude: -23.478038,
          userLongitude: -46.667582,
        }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("Should be able to check in on different days", async () => {
    await sut.execute({
      gymId,
      userId,
      userLatitude: -23.478038,
      userLongitude: -46.667582,
    });

    vi.setSystemTime(new Date(2026, 4, 24, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId,
      userId,
      userLatitude: -23.478038,
      userLongitude: -46.667582,
    });

    expect(checkIn);
  });

  it("Should not be able to check in at a distant gym", async () => {
    const testGymCoordinate = randomUUID();

    inMemoryGyms.create({
      id: testGymCoordinate,
      title: "Test Gym 2",
      description: "",
      phone: "",
      latitude: new Decimal(-23.47824),
      longitude: new Decimal(-46.644658),
    });

    await expect(
      async () =>
        await sut.execute({
          gymId: testGymCoordinate,
          userId,
          userLatitude: -23.478038,
          userLongitude: -46.667582,
        }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
