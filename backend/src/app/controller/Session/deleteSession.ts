import type { RouteHandlerMethod } from "fastify";
import type { Context } from "../../context.js";

export const deleteSession =
  (_: Context): RouteHandlerMethod =>
  async (req, reply) => {
    await reply.status(204).type("application/json").send();
  };
