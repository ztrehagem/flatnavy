import type { RouteHandlerMethod } from "fastify";
import type { RequestPayload, ResponsePayload } from "@flatnavy/api";
import type { Context } from "../../context.js";
import { logInfo } from "../../../utils/log.js";

let id = 1;

export const createPost =
  ({ httpAuthenticationService }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const { body } = req.body as RequestPayload<
      "/api/posts",
      "post"
    >["application/json"];

    const [authenticationError, _userHandle] =
      await httpAuthenticationService.getAuthenticatedUserHandle(
        req.headers.authorization ?? ""
      );

    if (authenticationError) {
      logInfo(authenticationError);
      return await reply.status(401).send();
    }

    const res: ResponsePayload<
      "/api/posts",
      "post"
    >["201"]["application/json"] = {
      post: {
        id: id++,
        body,
      },
    };

    await reply.status(201).type("application/json").send(res);
  };
