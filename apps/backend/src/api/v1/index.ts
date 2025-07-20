import type { FastifyInstance } from "fastify";

import { organizationRoutes } from "./organization/membership.route";
import { userRoutes } from "./user/user.route";

export const registerV1Routes = async (f: FastifyInstance) => {
  // Register user routes
  f.register(userRoutes, { prefix: "/v1" });
  f.register(organizationRoutes, { prefix: "/v1" });
};
