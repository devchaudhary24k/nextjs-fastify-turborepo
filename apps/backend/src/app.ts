import type { FastifyInstance } from "fastify";
import Fastify from "fastify";

import metricsPlugin from "./plugins/metrics";
import scalarPlugin from "./plugins/scalar";
import swaggerPlugin from "./plugins/swagger";
import swaggerUiPlugin from "./plugins/swagger-ui";
import { helloRoute } from "./routes/v1/users/user.route";

export const server = async () => {
  // Initialize App
  const f: FastifyInstance = Fastify({ logger: true });

  // Initialize Plugins
  await f.register(swaggerPlugin);
  await f.register(swaggerUiPlugin);
  await f.register(scalarPlugin);
  await f.register(metricsPlugin);

  // Load Rotues
  await f.register(helloRoute);

  // Middlewares

  return f;
};
