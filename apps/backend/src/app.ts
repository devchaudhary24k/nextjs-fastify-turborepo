import fastifyCors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";

import { registerRoutes } from "@/api/index";
import { env } from "@/env";
import { registerPlugins } from "@/plugins";

export const server = async () => {
  // Initialize App
  const f: FastifyInstance = Fastify({ logger: true });

  // Configure CORS policies
  f.register(fastifyCors, {
    origin: env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400,
  });

  // Initialize Plugins
  await f.register(registerPlugins);

  // Load Routes
  f.register(registerRoutes, { prefix: "/" });

  return f;
};

const startServer = async () => {
  const app = await server();
  app.listen(
    { port: env.SERVER_PORT, host: env.SERVER_HOST },
    (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info(`server listening on ${address}`);
    },
  );
};

startServer();
