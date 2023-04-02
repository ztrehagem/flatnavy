import { FastifyPluginAsync } from "fastify";
import fastifyCors from "@fastify/cors";
import { sse } from "./app/controller/sse.js";
import { createPost } from "./app/controller/createPost.js";
import { Context } from "./context.js";
import { createUser } from "./app/controller/User/createUser.js";

export type RouterOptions = {
  context: Context;
};

export const router: FastifyPluginAsync<RouterOptions> = async (
  app,
  { context }
) => {
  await app.register(fastifyCors, {
    origin: process.env.NODE_ENV != "production",
  });

  app.post("/api/users", createUser(context));
  app.post("/api/posts", createPost());
  app.get("/api/sse", sse());
};
