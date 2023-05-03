import operations from "@ztrehagem/openapi-to-fastify-schema/generated";
import type { Context } from "../../context.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineRoute.js";

export const indexUser = defineRoute(({ userRepository }: Context) => ({
  ...operations.indexUser,
  handler: async (req, reply) => {
    const users = await userRepository.index();

    return await reply.status(200).send({
      users: users.map(serializeUser),
    });
  },
}));
