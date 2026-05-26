import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { GetUserService } from "../get-user.service";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found.error";

let inMemoryUsers: InMemoryUsersRepository;
let sut: GetUserService;

describe("Get user service", () => {
  beforeEach(() => {
    inMemoryUsers = new InMemoryUsersRepository();
    sut = new GetUserService(inMemoryUsers);
  });

  it("Should be able to return a user", async () => {
    const createdUser = await inMemoryUsers.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user);
  });

  it("Should not be able to return a user", async () => {
    await expect(
      async () =>
        await sut.execute({
          userId: "pineaple",
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
