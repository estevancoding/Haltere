import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUserService } from "../authenticate-user.service";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "../errors/invalid-credentials.error";

let inMemoryUsers: InMemoryUsersRepository;
let sut: AuthenticateUserService;

describe("Authenticate User Service", () => {
  beforeEach(() => {
    inMemoryUsers = new InMemoryUsersRepository();
    sut = new AuthenticateUserService(inMemoryUsers);
  });

  it("Should be able to authenticate a user", async () => {
    await inMemoryUsers.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user);
  });

  it("Should not be able to authenticate with an incorrect email", async () => {
    await expect(
      async () =>
        await sut.execute({
          email: "johndoes@example.com",
          password: "123456",
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("Should not be able to authenticate with an incorrect password", async () => {
    await inMemoryUsers.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      async () =>
        await sut.execute({
          email: "johndoe@example.com",
          password: "1234567",
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
