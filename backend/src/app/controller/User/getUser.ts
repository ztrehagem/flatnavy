import type { Context } from "../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineController.js";
import { Type } from "@fastify/type-provider-typebox";
import { schema } from "../../schema.js";

export const getUser = defineRoute(({ userRepository }: Context) => ({
  method: "GET",
  url: "/api/users/:userHandle",
  schema: {
    params: Type.Object({
      userHandle: Type.Ref(schema.UserHandle),
    }),
    response: {
      200: Type.Object({
        user: Type.Ref(schema.User),
      }),
      400: Type.Void(),
      404: Type.Void(),
    },
  },
  handler: async (req, reply) => {
    const [eUserHandle, userHandle] = UserHandle.create(req.params.userHandle);

    if (eUserHandle) {
      return await reply.status(400);
    }

    const user = await userRepository.getByHandle(userHandle);

    if (!user) {
      return await reply.status(404);
    }

    return await reply.status(200).send({
      user: serializeUser(user),
    });
  },
}));
