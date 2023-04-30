import { defineResponse } from "@flatnavy/api/server";
import type { FastifyPluginAsync } from "fastify";
import type { Context } from "./app/context.js";
import { instantiateControllers } from "./app/controller/controllers.js";

/**
 * create fastify routings from abstracted controllers
 */
export const createRouter =
  (context: Context): FastifyPluginAsync =>
  (app) => {
    const controllers = instantiateControllers(context);

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

        if (!resp) return;

        return await reply
          .status(resp.status)
          .type(resp.mime ?? "text/plain")
          .send(resp.body);
      });
    }

    return Promise.resolve();
  };
