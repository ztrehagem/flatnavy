import fastifyCors from "@fastify/cors";
import { default as fastifyStatic } from "@fastify/static";
import { fastify, type FastifyInstance } from "fastify";
import * as path from "node:path";
import type { Context } from "./app/context.js";
import { createRouter } from "./createRouter.js";
import { ProcessEnv } from "./ProcessEnv.js";
import { logError, logInfo } from "./utils/log.js";

export type Params = {
  context: Context;
};

const STATIC_DIR = path.resolve("../frontend/dist");

export const createServer = async ({
  context,
}: Params): Promise<FastifyInstance> => {
  const server = fastify();

  if (!ProcessEnv.current.production) {
    await server.register(fastifyCors, {
      origin: true,
      credentials: true,
      prefix: "/api/",
    });
  }

  await server.register(createRouter(context));

  await server.register(fastifyStatic, { root: STATIC_DIR });

  server.setNotFoundHandler(async (req, reply) => {
    const [pathname] = req.url.split("?", 2);

    if (/\/[^/.]*\/?$/i.exec(pathname)) {
      await reply.sendFile("index.html", STATIC_DIR);
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
