import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import createGymFactory from "@/services/factories/create-gym.factory";

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, latitude, longitude, phone } =
    createGymBodySchema.parse(req.body);

  const { createGym } = createGymFactory();

  await createGym.execute({ title, description, latitude, longitude, phone });

  return res.status(201).send();
}
