import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import metricsPlugin from "./metrics";
import scalarPlugin from "./scalar";
import swaggerPlugin from "./swagger";

export const registerPlugins = fp(async (f: FastifyInstance) => {
  await f.register(swaggerPlugin);
  await f.register(scalarPlugin);
  await f.register(metricsPlugin);
});
