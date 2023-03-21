import { RouteHandlerMethod } from "fastify";
import { PostStore } from "../store/PostStore.js";

export const postPost = (): RouteHandlerMethod => (req, reply) => {
  const { post } = req.body as Record<string, any>;

  PostStore.global.pushPost(post);

  reply.status(201);
  reply.send();
};
