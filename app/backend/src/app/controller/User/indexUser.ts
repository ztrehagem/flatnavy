import { RouteHandlerMethod } from "fastify";
import { Context } from "../../../context.js";
import { ResponsePayload } from "@flatnavy/lib-api";
import { serializeUser } from "../../serializer/User/User.js";

export const indexUser =
  ({ userRepository }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const users = await userRepository.index();

    const res: ResponsePayload<"/api/users", "get">["200"]["application/json"] =
      {
        users: users.map(serializeUser),
      };

    await reply.status(200).type("application/json").send(res);
  };
