import operations from "@ztrehagem/openapi-to-fastify-schema/generated";
import type { Context } from "../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineRoute.js";

export const createSession = defineRoute(
  ({ userRepository, serverKeyRepository, sessionService }: Context) => ({
    ...operations.createAuthentication,
    handler: async (req, reply) => {
      const [eHandle, handle] = UserHandle.create(req.body.handle);

      if (eHandle) {
        return await reply.status(400).send();
      }

      const authentication = await userRepository.getUserAuthenticationByHandle(
        handle
      );

      if (!authentication) {
        return await reply.status(400).send();
      }

      const isMatched = await authentication.password.compare(
        req.body.password
      );

      if (!isMatched) {
        return await reply.status(400).send();
      }

      const { accessToken, refreshToken } = await sessionService.createSession({
        user: authentication.user,
      });
      const serverKey = await serverKeyRepository.get();
      const accessTokenJwt = await serverKey.signToken(accessToken);
      const refreshTokenJwt = await serverKey.signToken(refreshToken);

      return await reply
        .status(201)
        .headers({
          "X-Session-Operation": "created",
          "X-Access-Token": accessTokenJwt,
          "X-Refresh-Token": refreshTokenJwt,
        })
        .send({
          user: serializeUser(authentication.user),
        });
    },
  })
);
