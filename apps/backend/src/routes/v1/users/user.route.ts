import { FastifyInstance } from "fastify";

export const helloRoute = (app: FastifyInstance) => {
  app.get(
    "/hello",
    {
      schema: {
        description: "Returns a greeting",
        tags: ["General"],
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      return { message: "Hello from Fastify + TypeScript!" };
    },
  );
};
