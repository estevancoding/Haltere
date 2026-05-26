import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";
import { CreateGymsService } from "../create-gym.service";

let inMemoryGyms: InMemoryGymsRepository;
let sut: CreateGymsService;

describe("Create User Service", () => {
  beforeEach(() => {
    inMemoryGyms = new InMemoryGymsRepository();
    sut = new CreateGymsService(inMemoryGyms);
  });

  it("should be able to create a new gym", async () => {
    const { gym } = await sut.execute({
      title: "Gym Test 01",
      description: null,
      phone: null,
      latitude: -23.478038,
      longitude: -46.667582,
    });

    expect(gym);
  });
});
