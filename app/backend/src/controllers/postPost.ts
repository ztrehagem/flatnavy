import { RouteHandlerMethod } from "fastify";
import { PostStore } from "../store/PostStore.js";

export const postPost = (): RouteHandlerMethod => async (req, reply) => {
  const { post } = req.body as { post: string };

  PostStore.global.pushPost(post);

  await reply.status(201).send();
};
