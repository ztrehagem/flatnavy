import { Type } from "@fastify/type-provider-typebox";
import type { Context } from "../../context.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineController.js";
import { schema } from "../../schema.js";

export const indexUser = defineRoute(({ userRepository }: Context) => ({
  method: "GET",
  url: "/api/users",
  schema: {
    response: {
      200: Type.Object({
        users: Type.Array(Type.Ref(schema.User)),
      }),
    },
  },
  handler: async (req, reply) => {
    const users = await userRepository.index();

    return await reply.status(200).send({
      users: users.map(serializeUser),
    });
  },
}));
