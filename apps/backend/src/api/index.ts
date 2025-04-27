import type { FastifyInstance } from "fastify";

import { registerV1Routes } from "./routes/v1";

export const registerRoutes = async (f: FastifyInstance) => {
  f.register(registerV1Routes, { prefix: "/v1" });
};
