import type { FastifyInstance } from "fastify";
import Fastify from "fastify";

import { registerRoutes } from "./api";
import { registerPlugins } from "./plugins";

export const server = async () => {
  // Initialize App
  const f: FastifyInstance = Fastify({ logger: true });

  // Initialize Plugins
  await f.register(registerPlugins);

  // Load Rotues
  f.register(registerRoutes, { prefix: "/api" });

  // Middlewares

  return f;
};
