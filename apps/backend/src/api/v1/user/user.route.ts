import type { FastifyInstance } from "fastify";

import { getUserHandler, getUsersHandler } from "./user.controller";
import { getUserSchema, getUsersSchema } from "./user.schema";

export const userRoutes = async (f: FastifyInstance) => {
  f.get("/users", { schema: getUsersSchema }, getUsersHandler);
  f.get("/users/:id", { schema: getUserSchema }, getUserHandler);
};
