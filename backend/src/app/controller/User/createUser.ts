import type { Context } from "../../context.js";
import { HashedUserPassword } from "../../model/User/HashedUserPassword.js";
import { NewUser } from "../../model/User/NewUser.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { UserName } from "../../model/User/UserName.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineController.js";
import { Type } from "@fastify/type-provider-typebox";
import { schema } from "../../schema.js";

export const createUser = defineRoute(
  ({ userRepository, serverKeyRepository, sessionService }: Context) => ({
    method: "POST",
    url: "/api/users",
    schema: {
      body: Type.Object({
        handle: Type.String(),
        name: Type.String(),
        password: Type.String(),
      }),
      response: {
        201: Type.Object({
          user: Type.Ref(schema.User),
          accessToken: Type.String(),
          refreshToken: Type.String(),
        }),
        400: Type.Void(),
        409: Type.Void(),
      },
    },
    handler: async (req, reply) => {
      const [eHandle, handle] = UserHandle.create(req.body.handle);

      if (eHandle) {
        return await reply.status(400);
      }

      const [eUserName, userName] = UserName.create(req.body.name);

      if (eUserName) {
        return await reply.status(400);
      }

      const [ePassword, password] = await HashedUserPassword.hash(
        req.body.password
      );

      if (ePassword) {
        return await reply.status(400);
      }

      const newUser = NewUser.create({
        handle,
        name: userName,
        password,
      });

      const [error, createdUser] = await userRepository.create(newUser);

      if (error) {
        return await reply.status(409);
      }

      const serverKey = await serverKeyRepository.get();
      const { accessToken, refreshToken } = await sessionService.createSession({
        user: createdUser,
      });
      const accessTokenJwt = await serverKey.signToken(accessToken);
      const refreshTokenJwt = await serverKey.signToken(refreshToken);

      return await reply.status(201).send({
        user: serializeUser(createdUser),
        accessToken: accessTokenJwt,
        refreshToken: refreshTokenJwt,
      });
    },
  })
);
