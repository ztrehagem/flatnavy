import fastifyCors from "@fastify/cors";
import { default as fastifyStatic } from "@fastify/static";
import { fastifySwagger } from "@fastify/swagger";
import { fastify, type FastifyInstance } from "fastify";
import * as path from "node:path";
import type { Context } from "./app/context.js";
import { createRouter } from "./createRouter.js";
import { ProcessEnv } from "./ProcessEnv.js";
import { logError, logInfo } from "./utils/log.js";
import { schema } from "./app/schema.js";

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "FlatNavy API",
        version: "0.1.1",
      },
      components: {
        securitySchemes: {
          AccessToken: {
            name: "AccessToken",
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
          RefreshToken: {
            name: "RefreshToken",
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await server.register(createRouter(context));

  for (const [, s] of Object.entries(schema)) {
    server.addSchema(s);
  }

  server.get("/api/schema.json", async (req, reply) => {
    await reply.status(200).type("application/json").send(server.swagger());
  });

  server.get("/api/schema.yaml", async (req, reply) => {
    await reply
      .status(200)
      .type("text/yaml")
      .send(server.swagger({ yaml: true }));
  });

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
