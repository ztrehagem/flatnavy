import * as path from "node:path";
import { fastify, type FastifyInstance } from "fastify";
import { default as fastifyStatic } from "@fastify/static";
import { router } from "./router.js";
import type { Context } from "./app/context.js";
import { logInfo } from "./utils/log.js";

export type Params = {
  context: Context;
};

export const createServer = async ({
  context,
}: Params): Promise<FastifyInstance> => {
  const server = fastify();

  await server.register(router, { context });

  await server.register(fastifyStatic, {
    root: path.resolve("../frontend/dist"),
  });

  server.addHook("onRequest", async (req, reply) => {
    logInfo(`🌐 ${req.method} ${req.url}`);
  });

  return server;
};
