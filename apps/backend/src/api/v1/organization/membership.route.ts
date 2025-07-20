import type { FastifyInstance } from "fastify";

import { getOrganizationMembershipController } from "./membership.controller";
import { getOrganizationMembershipSchema } from "./membership.schema";

export const organizationRoutes = async (f: FastifyInstance) => {
  f.get(
    "/organization/:slug/membership",
    { schema: getOrganizationMembershipSchema },
    getOrganizationMembershipController,
  );
};
