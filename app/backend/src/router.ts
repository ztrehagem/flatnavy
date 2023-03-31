import { FastifyPluginAsync } from "fastify";
import fastifyCors from "@fastify/cors";
import { sse } from "./controllers/sse.js";
import { createPost } from "./controllers/createPost.js";

export const router: FastifyPluginAsync = async (app) => {
  await app.register(fastifyCors, {
    origin: process.env.NODE_ENV != "production",
  });

  app.post("/posts", createPost());
  app.get("/sse", sse());
};
