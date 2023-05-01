import { Type } from "@fastify/type-provider-typebox";
import { defineRoute } from "../defineController.js";

export const deleteSession = defineRoute(() => ({
  method: "DELETE",
  url: "/api/auth",
  schema: {
    security: [{ AccessToken: [] }],
    response: {
      204: Type.Void(),
    },
  },
  handler: async (req, reply) => {
    return await reply.status(204).send();
  },
}));
