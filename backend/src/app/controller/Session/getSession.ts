import { Type } from "@fastify/type-provider-typebox";
import { logInfo } from "../../../utils/log.js";
import type { Context } from "../../context.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineController.js";
import { schema } from "../../schema.js";

export const getSession = defineRoute(
  ({ httpAuthenticationService, userRepository }: Context) => ({
    method: "GET",
    url: "/api/auth",
    schema: {
      security: [{ AccessToken: [] }],
      response: {
        200: Type.Object({
          user: Type.Ref(schema.User),
        }),
        401: Type.Void(),
      },
    },
    handler: async (req, reply) => {
      const [authenticationError, token] =
        await httpAuthenticationService.parseAuthenticationToken(
          req.headers.authorization ?? ""
        );

      if (authenticationError) {
        logInfo(authenticationError);
        return await reply.status(401).send();
      }

      const user = await userRepository.getByHandle(token.userHandle);

      if (!user) {
        return await reply.status(401).send();
      }

      return await reply.status(200).send({
        user: serializeUser(user),
      });
    },
  })
);
