import { defineResponse, type AbstractController } from "@flatnavy/api/server";
import type { FastifyPluginAsync } from "fastify";

export type RouterOptions = {
  controllers: readonly AbstractController[];
};

/**
 * create fastify routings from abstracted controllers
 */
export const router: FastifyPluginAsync<RouterOptions> = (
  app,
  { controllers }
) => {
  for (const { method, path, handler } of controllers) {
    const pathPattern = path.replaceAll(
      /{([^}])}/g,
      (_, name: string) => `:${name}`
    );

    app[method](pathPattern, async (req, reply) => {
      for (const [k, v] of Object.entries(reply.getHeaders())) {
        if (v != null) {
          reply.raw.setHeader(k, v);
        }
      }

      const resp = await handler(
        {
          pathParams: req.params,
          queryParams: req.query,
          body: req.body,
          defineResponse,
        },
        req.raw,
        reply.raw
      );

      if (resp) {
        if (resp.mime) {
          return await reply
            .status(resp.status)
            .type(resp.mime)
            .send(resp.body);
        } else {
          return await reply.status(resp.status).send(resp.body);
        }
      }
    });
  }

  return Promise.resolve();
};
