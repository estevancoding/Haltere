import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import getNearbyGymsFactory from "@/services/factories/get-nearby-gyms.factory";

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymQuerySchema.parse(req.query);

  const { getNearbyGyms } = getNearbyGymsFactory();

  const { gyms } = await getNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return res.status(200).send({ gyms });
}
