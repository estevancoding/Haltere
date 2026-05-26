import { expect, describe, it, beforeEach } from "vitest";
import { CreateUserService } from "../create-user.service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists.error";

let inMemoryUsers: InMemoryUsersRepository;
let sut: CreateUserService;

describe("Create User Service", () => {
  beforeEach(() => {
    inMemoryUsers = new InMemoryUsersRepository();
    sut = new CreateUserService(inMemoryUsers);
  });

  it("should be able to create a new user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user);
  });

  it("should hash user password during registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create a user with a email that already exists", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
