import * as path from "node:path";
import { fastify, type FastifyInstance } from "fastify";
import { default as fastifyStatic } from "@fastify/static";
import fastifyCors from "@fastify/cors";
import { router } from "./router.js";
import type { Context } from "./app/context.js";
import { logError, logInfo } from "./utils/log.js";

export type Params = {
  context: Context;
};

export const createServer = async ({
  context,
}: Params): Promise<FastifyInstance> => {
  const server = fastify();

  if (process.env.NODE_ENV != "production") {
    await server.register(fastifyCors, {
      origin: true,
      credentials: true,
    });
  }

  await server.register(router, { context });

  await server.register(fastifyStatic, {
    root: path.resolve("../frontend/dist"),
  });

  server.addHook("onRequest", async (req, reply) => {
    logInfo(`🌐 ${req.method} ${req.url}`);
  });

  server.addHook("onError", async (req, reply, error) => {
    logError(error);
  });

  return server;
};
