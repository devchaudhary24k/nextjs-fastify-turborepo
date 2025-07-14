import type { FastifyInstance } from "fastify";

import {
  getUserHandler,
  getUserVerificationController,
  getUsersHandler,
} from "./user.controller";
import {
  getUserSchema,
  getUserVerificationSchema,
  getUsersSchema,
} from "./user.schema";

export const userRoutes = async (f: FastifyInstance) => {
  f.get("/users", { schema: getUsersSchema }, getUsersHandler);
  f.get("/users/:id", { schema: getUserSchema }, getUserHandler);
  f.get(
    "/user/check-email-verification/:id",
    { schema: getUserVerificationSchema },
    getUserVerificationController,
  );
};
