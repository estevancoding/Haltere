import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";
import { GetGymssService } from "../get-gyms.service";

let inMemoryGyms: InMemoryGymsRepository;
let sut: GetGymssService;

describe("Get Gyms Service", () => {
  beforeEach(async () => {
    inMemoryGyms = new InMemoryGymsRepository();
    sut = new GetGymssService(inMemoryGyms);
  });

  it("Should be able to search for gyms by query", async () => {
    await inMemoryGyms.create({
      title: "Gym Test 01",
      description: null,
      phone: null,
      latitude: -23.478038,
      longitude: -46.667582,
    });

    await inMemoryGyms.create({
      title: "Gym Test 02",
      description: null,
      phone: null,
      latitude: -23.478038,
      longitude: -46.667582,
    });

    const { gyms } = await sut.execute({ query: "Gym", page: 1 });

    expect(gyms).toHaveLength(2);
  });

  it("Should be able to search for paginated gyms by query", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGyms.create({
        title: `Gym Test ${i}`,
        description: null,
        phone: null,
        latitude: -23.478038,
        longitude: -46.667582,
      });
    }

    const { gyms } = await sut.execute({ query: "Gym", page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Gym Test 21" }),
      expect.objectContaining({ title: "Gym Test 22" }),
    ]);
  });
});
