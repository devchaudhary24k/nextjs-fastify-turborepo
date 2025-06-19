import type { FastifyInstance } from "fastify";

import {
  getUserHandler,
  getUsersHandler,
} from "../controllers/user.controller";
import { getUserSchema, getUsersSchema } from "../schemas/item.schema";

export const userRoutes = async (f: FastifyInstance) => {
  f.get("/", { schema: getUsersSchema }, getUsersHandler);
  f.get("/:id", { schema: getUserSchema }, getUserHandler);
};
