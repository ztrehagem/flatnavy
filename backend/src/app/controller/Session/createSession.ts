import type { Context } from "../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineController.js";
import { Type } from "@fastify/type-provider-typebox";
import { schema } from "../../schema.js";

export const createSession = defineRoute(
  ({ userRepository, serverKeyRepository, sessionService }: Context) => ({
    method: "POST",
    url: "/api/auth",
    schema: {
      body: Type.Object({
        handle: Type.String(),
        password: Type.String(),
      }),
      response: {
        201: Type.Object({
          user: Type.Ref(schema.User),
          accessToken: Type.String(),
          refreshToken: Type.String(),
        }),
        400: Type.Void(),
      },
    },
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

      return await reply.status(201).send({
        user: serializeUser(authentication.user),
        accessToken: accessTokenJwt,
        refreshToken: refreshTokenJwt,
      });
    },
  })
);
