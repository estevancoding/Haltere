import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { AuthenticateCheckInService } from "../authenticate-check-in.service";

export default function authenticateCheckInFactory() {
  const prismaCheckIns = new PrismaCheckInsRepository();
  const authenticateCheckIn = new AuthenticateCheckInService(prismaCheckIns);

  return { authenticateCheckIn };
}
