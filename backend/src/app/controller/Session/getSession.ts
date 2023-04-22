import type { RouteHandlerMethod } from "fastify";
import type { Context } from "../../context.js";
import { logInfo } from "../../../utils/log.js";
import type { ResponsePayload } from "@flatnavy/api";
import { serializeUser } from "../../serializer/User/User.js";

export const getSession =
  ({
    httpAuthenticationService,
    userRepository,
  }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const [authenticationError, userHandle] =
      await httpAuthenticationService.getAuthenticatedUserHandle(
        req.headers.authorization ?? ""
      );

    if (authenticationError) {
      logInfo(authenticationError);
      return await reply.status(401).send();
    }

    const user = await userRepository.getByHandle(userHandle);

    if (!user) {
      return await reply.status(401).send();
    }

    const res: ResponsePayload<"/api/auth", "get">["200"]["application/json"] =
      {
        user: serializeUser(user),
      };

    await reply.status(200).type("application/json").send(res);
  };
