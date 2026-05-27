import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { GetUserCheckInsService } from "../get-user-check-ins.service";
import { randomUUID } from "node:crypto";

let inMemoryCheckIns: InMemoryCheckInsRepository;
let sut: GetUserCheckInsService;
const userId = randomUUID();

describe("Get User's Check-ins Service", () => {
  beforeEach(async () => {
    inMemoryCheckIns = new InMemoryCheckInsRepository();
    sut = new GetUserCheckInsService(inMemoryCheckIns);
  });

  it("Should be able to get the user's check-in history", async () => {
    await inMemoryCheckIns.create({
      gym_id: "Gym 01",
      user_id: userId,
    });

    await inMemoryCheckIns.create({
      gym_id: "Gym 02",
      user_id: userId,
    });

    const { checkIns } = await sut.execute({ userId, page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "Gym 01" }),
      expect.objectContaining({ gym_id: "Gym 02" }),
    ]);
  });

  it("Should be able to get the user's paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckIns.create({
        gym_id: `Gym ${i}`,
        user_id: userId,
      });
    }

    const { checkIns } = await sut.execute({ userId, page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "Gym 21" }),
      expect.objectContaining({ gym_id: "Gym 22" }),
    ]);
  });
});
