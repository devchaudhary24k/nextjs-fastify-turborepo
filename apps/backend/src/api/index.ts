import type { FastifyInstance } from "fastify";

import { authRoutes } from "./auth/auth.route";
import { registerV1Routes } from "./v1";

export const registerRoutes = async (f: FastifyInstance) => {
  // Auth Route Registration
  f.register(authRoutes);

  // Auth Registration
  f.register(registerV1Routes, { prefix: "/api" });
};
