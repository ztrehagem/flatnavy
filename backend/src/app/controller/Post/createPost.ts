import type { RouteHandlerMethod } from "fastify";
import type { RequestPayload, ResponsePayload } from "@flatnavy/api";
import type { Context } from "../../context.js";

let id = 1;

export const createPost =
  ({ serverKeyRepository }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const { body } = req.body as RequestPayload<
      "/api/posts",
      "post"
    >["application/json"];

    const [type = "", jwt = ""] =
      req.headers.authorization?.split(" ", 2) ?? [];

    if (type != "Bearer" || !jwt) {
      return await reply.status(401).send();
    }

    const serverKey = await serverKeyRepository.get();
    const [eAccessToken, accessToken] = await serverKey.verifyAccessToken(jwt);

    if (eAccessToken) {
      return await reply.status(401).send();
    }

    if (!accessToken.valid) {
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
