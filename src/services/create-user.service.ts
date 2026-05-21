import bcrypt from "bcryptjs";
import type { UsersRepository } from "@/repositories/users.repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import type { User } from "../../prisma/generated/client";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async create({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await bcrypt.hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
