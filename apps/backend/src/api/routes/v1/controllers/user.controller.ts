import type { FastifyReply, FastifyRequest } from "fastify";

export const getUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  // Implementation Here
  return { user: [] };
};

export const getUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  return { id, name: "Dev Talan", email: "dev@gmail.com" };
};
