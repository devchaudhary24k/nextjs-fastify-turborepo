import { db } from "@repo/database";
import { member, organization } from "@repo/database/schema/auth-schema";
import { and, eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";

import { auth } from "@/auth/auth";

/**
 * Controller: getOrganizationMembershipController
 * Checks if the current user is a member of the organization by slug.
 *
 * @param req - FastifyRequest with slug param and session
 * @param reply - FastifyReply
 * @returns 200 with organization and membership info if valid, 401 if unauthorized, 404 if not a member or org not found
 */
export const getOrganizationMembershipController = async (
  req: FastifyRequest<{ Params: { slug: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { slug } = req.params;
    // Pass headers from Fastify request to Better Auth
    // Convert headers to string-only entries for Headers constructor
    const headerEntries = Object.entries(req.headers).filter(
      ([, value]) => typeof value === "string",
    ) as [string, string][];

    const session = await auth.api.getSession({
      headers: new Headers(headerEntries),
    });

    console.log(headerEntries);
    console.log(session);

    if (!session) return reply.status(404).send({ error: "Unauthenticated" });

    const orgWithMembership = await db
      .select()
      .from(organization)
      .innerJoin(member, eq(organization.id, member.organizationId))
      .where(
        and(eq(organization.slug, slug), eq(member.userId, session.user.id)),
      )
      .limit(1)
      .execute();

    if (!orgWithMembership.length) {
      return reply.send({ isMember: false });
    }

    return reply.send({ isMember: true });
  } catch (error) {
    return reply
      .status(500)
      .send({ error: error instanceof Error ? error.message : "Server error" });
  }
};
