import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";

import { registerRoutes } from "@/api/index";
import { registerPlugins } from "@/plugins";

export const server = async () => {
  // Initialize App
  const f: FastifyInstance = Fastify({ logger: true });

  await f.register(cors, {
    origin: "localhost",
  });

  // Initialize Plugins
  await f.register(registerPlugins);

  // Load Routes
  f.register(registerRoutes, { prefix: "/" });

  return f;
};

const startServer = async () => {
  const app = await server();
  app.listen({ port: 8000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
  });
};

startServer();
