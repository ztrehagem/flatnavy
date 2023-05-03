import operations from "@ztrehagem/openapi-to-fastify-schema/generated";
import { logInfo } from "../../../utils/log.js";
import type { Context } from "../../context.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineRoute.js";

export const getSession = defineRoute(
  ({ httpAuthenticationService, userRepository }: Context) => ({
    ...operations.getAuthentication,
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
