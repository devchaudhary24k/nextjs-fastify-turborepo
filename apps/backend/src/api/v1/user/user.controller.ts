import { db } from "@repo/database";
import { user } from "@repo/database/schema/index";
import { and, eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";

type GetUserParams = {
  id: string;
};

type getUserVerificationControllerParams = {
  id: string;
  email: string;
};

export const getUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  // Implementation Here
  return { user: [] };
};

export const getUserHandler = async (
  req: FastifyRequest<{ Params: GetUserParams }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  return { id, name: "Dev Talan", email: "dev@gmail.com" };
};

export const getUserVerificationController = async (
  req: FastifyRequest<{ Querystring: getUserVerificationControllerParams }>,
  res: FastifyReply,
) => {
  const { id, email } = req.query;

  try {
    const result = await db
      .select({
        isVerified: user.emailVerified,
      })
      .from(user)
      .where(and(eq(user.id, id), eq(user.email, email)))
      .limit(1)
      .execute();

    const userResult = result[0];

    if (!userResult) return { isVerified: false };
    return { isVerified: userResult.isVerified };
  } catch (err) {
    return res.code(500).send({ error: "Internal Server Error" });
  }
};
