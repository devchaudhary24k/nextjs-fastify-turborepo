import type { FastifyReply, FastifyRequest } from "fastify";

type GetUserParams = {
  id: string;
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
