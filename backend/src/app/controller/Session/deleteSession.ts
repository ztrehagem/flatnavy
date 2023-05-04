import operations from "@ztrehagem/openapi-to-fastify-schema/generated";
import { defineRoute } from "../defineRoute.js";

export const deleteSession = defineRoute(() => ({
  ...operations.deleteAuthentication,
  handler: async (req, reply) => {
    return await reply
      .status(204)
      .headers({
        "X-Session-Operation": "revoked",
      })
      .send();
  },
}));
