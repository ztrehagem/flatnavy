import type { RouteHandlerMethod } from "fastify";
import type { RequestPayload, ResponsePayload } from "@flatnavy/api";
import { PostStore } from "../store/PostStore.js";

let id = 1;

export const createPost = (): RouteHandlerMethod => async (req, reply) => {
  const { body } = req.body as RequestPayload<
    "/api/posts",
    "post"
  >["application/json"];

  PostStore.global.pushPost(body);

  const res: ResponsePayload<"/api/posts", "post">["201"]["application/json"] =
    {
      post: {
        id: id++,
        body,
      },
    };

  await reply.status(201).type("application/json").send(res);
};
