import type { RouteHandlerMethod } from "fastify";
import type { Context } from "../../context.js";
import type { PathParameters, ResponsePayload } from "@flatnavy/api";
import { serializeUser } from "../../serializer/User.js";
import { UserHandle } from "../../model/User/UserHandle.js";

export const getUser =
  ({ userRepository }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const params = req.params as PathParameters<
      "/api/users/{userHandle}",
      "get"
    >;

    const [eUserHandle, userHandle] = UserHandle.create(params.userHandle);

    if (eUserHandle) {
      return await reply.status(400).send();
    }

    const user = await userRepository.getByHandle(userHandle);

    if (!user) {
      return await reply.status(404).send();
    }

    const res: ResponsePayload<
      "/api/users/{userHandle}",
      "get"
    >["200"]["application/json"] = {
      user: serializeUser(user),
    };

    await reply.status(200).type("application/json").send(res);
  };
