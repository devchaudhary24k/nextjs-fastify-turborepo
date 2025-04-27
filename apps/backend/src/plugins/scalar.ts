import scalar from "@scalar/fastify-api-reference";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const scalarPlugin = async (f: FastifyInstance) => {
  await f.register(scalar, {
    routePrefix: "/docs",
    configuration: {
      title: "Our API Reference",
      theme: "purple",
      // url: "/openapi.json",
    },
  });
};

export default fp(scalarPlugin);
