import type { FastifyPluginAsync } from "fastify";
import type { Context } from "./app/context.js";
import { instantiateControllers } from "./app/controller/controllers.js";
import type { AbstractDefineResponse } from "./app/controller/types.js";
import { logInfo } from "./utils/log.js";

/**
 * create fastify routings from abstracted controllers
 */
export const createRouter =
  (context: Context): FastifyPluginAsync =>
  (app) => {
    const controllers = instantiateControllers(context);

    for (const { method, path, validate, handler } of controllers) {
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

        let validated;

        try {
          validated = validate({
            pathParams: req.params,
            queryParams: req.query,
            body: req.body,
          });
        } catch (error) {
          logInfo(error);
          return await reply.status(400).send();
        }

        const resp = await handler(
          { ...validated, defineResponse },
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

const defineResponse: AbstractDefineResponse = (r) => r;
