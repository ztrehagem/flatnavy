import * as path from "node:path";
import { fastify, type FastifyInstance } from "fastify";
import { default as fastifyStatic } from "@fastify/static";
import fastifyCors from "@fastify/cors";
import { router } from "./router.js";
import type { Context } from "./app/context.js";
import { logError, logInfo } from "./utils/log.js";
import { ProcessEnv } from "./ProcessEnv.js";

export type Params = {
  context: Context;
};

export const createServer = async ({
  context,
}: Params): Promise<FastifyInstance> => {
  const server = fastify();

  if (!ProcessEnv.current.production) {
    await server.register(fastifyCors, {
      origin: true,
      credentials: true,
    });
  }

  await server.register(router, { context });

  const staticDir = path.resolve("../frontend/dist");

  await server.register(fastifyStatic, {
    root: staticDir,
  });

  server.setNotFoundHandler(async (req, reply) => {
    const [pathname] = req.url.split("?", 2);

    if (/\/[^/.]*\/?$/i.exec(pathname)) {
      await reply.sendFile("index.html", staticDir);
    } else {
      reply.callNotFound();
    }
  });

  server.addHook("onRequest", async (req, reply) => {
    logInfo(`🌐 ${req.method} ${req.url}`);
  });

  server.addHook("onError", async (req, reply, error) => {
    logError(error);
  });

  return server;
};
