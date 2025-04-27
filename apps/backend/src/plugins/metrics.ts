import type { FastifyInstance } from "fastify";
import metrics from "fastify-metrics";
import fp from "fastify-plugin";

const metricsPlugin = async (f: FastifyInstance) => {
  await f.register(metrics, {
    endpoint: "/metrics",
  });
};

export default fp(metricsPlugin);
