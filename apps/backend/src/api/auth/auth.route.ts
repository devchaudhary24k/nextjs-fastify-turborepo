import type { FastifyInstance } from "fastify";

import { authHandler } from "./auth.handler";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: ["GET", "POST"],
    url: "api/auth/*",
    handler: authHandler,
  });
};
