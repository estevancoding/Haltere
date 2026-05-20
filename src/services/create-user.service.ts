import bcrypt from "bcryptjs";
import type { UsersRepository } from "../repositories/users.repository";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async create({ name, email, password }: CreateUserRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("email already exists");
    }

    const password_hash = await bcrypt.hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
