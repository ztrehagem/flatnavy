import { RouteHandlerMethod } from "fastify";
import { ApiReqBody } from "@flatnavy/lib-api";
import { PostStore } from "../store/PostStore.js";

export const postPost = (): RouteHandlerMethod => async (req, reply) => {
  const { body } = req.body as ApiReqBody<"post", "/posts">;

  PostStore.global.pushPost(body);

  await reply.status(201).send();
};
