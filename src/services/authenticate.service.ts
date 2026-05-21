import type { UsersRepository } from "@/repositories/users.repository";
import { InvalidCredentialError } from "./errors/invalid-credentials.error";
import bcrypt from "bcryptjs";
import type { User } from "../../prisma/generated/client";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialError();
    }

    const doesPasswordMatches = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError();
    }

    return {
      user,
    };
  }
}
