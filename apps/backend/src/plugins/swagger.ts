import fastifySwagger from "@fastify/swagger";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const swaggerPlugin = async (f: FastifyInstance) => {
  await f.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Pixelact Studios API Docs",
        description:
          "These are official docs of backend server of Pixelact Studios",
        version: "0.0.1",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development Server",
        },
      ],
      tags: [
        { name: "user", description: "User related end-points" },
        { name: "project", description: "Projects related end-points" },
      ],
      components: {
        securitySchemes: {},
      },
    },
  });
};

export default fp(swaggerPlugin);
