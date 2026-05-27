import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { GetUserMetricsService } from "../get-user-metrics.service";

export default function getUserMetricsFactory() {
  const prismaCheckIns = new PrismaCheckInsRepository();
  const getUserMetrics = new GetUserMetricsService(prismaCheckIns);

  return { getUserMetrics };
}
