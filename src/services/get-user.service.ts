import type { UsersRepository } from "@/repositories/users.repository";
import type { User } from "../../prisma/generated/client";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

interface GetUserRequest {
  userId: string;
}

interface GetUserResponse {
  user: User;
}

export class GetUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError("User");
    }

    return {
      user,
    };
  }
}
