import operations from "@ztrehagem/openapi-to-fastify-schema/generated";
import type { Context } from "../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineRoute.js";

export const getUser = defineRoute(({ userRepository }: Context) => ({
  ...operations.getUser,
  handler: async (req, reply) => {
    const [eUserHandle, userHandle] = UserHandle.create(req.params.userHandle);

    if (eUserHandle) {
      return await reply.status(400).send();
    }

    const user = await userRepository.getByHandle(userHandle);

    if (!user) {
      return await reply.status(404).send();
    }

    return await reply.status(200).send({
      user: serializeUser(user),
    });
  },
}));
