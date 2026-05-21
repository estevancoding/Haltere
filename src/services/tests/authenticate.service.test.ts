import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "../authenticate.service";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "../errors/invalid-credentials.error";

let inMemoryUsers: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    inMemoryUsers = new InMemoryUsersRepository();
    sut = new AuthenticateService(inMemoryUsers);
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

  it("Should not be able to authenticate with a wrong email", async () => {
    expect(
      async () =>
        await sut.execute({
          email: "johndoes@example.com",
          password: "123456",
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("Should not be able to authenticate with a wrong email", async () => {
    await inMemoryUsers.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(
      async () =>
        await sut.execute({
          email: "johndoe@example.com",
          password: "1234567",
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
