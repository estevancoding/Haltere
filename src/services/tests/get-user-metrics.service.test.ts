import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { randomUUID } from "node:crypto";
import { GetUserMetricsService } from "../get-user-metrics.service";

let inMemoryCheckIns: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;
const userId = randomUUID();

describe("Get User Metrics Service", () => {
  beforeEach(async () => {
    inMemoryCheckIns = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(inMemoryCheckIns);
  });

  it("Should be able to get the user's check-ins count", async () => {
    await inMemoryCheckIns.create({
      gym_id: "Gym 01",
      user_id: userId,
    });

    await inMemoryCheckIns.create({
      gym_id: "Gym 02",
      user_id: userId,
    });

    const { checkInsCount } = await sut.execute({ userId });

    expect(checkInsCount).toEqual(2);
  });
});
