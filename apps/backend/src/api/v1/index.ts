import type { FastifyInstance } from "fastify";

import { userRoutes } from "./user/user.route";

export const registerV1Routes = async (f: FastifyInstance) => {
  // Register user routes
  f.register(userRoutes, { prefix: "/v1" });
};
