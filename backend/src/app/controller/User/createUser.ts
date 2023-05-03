import operations from "@ztrehagem/openapi-to-fastify-schema/generated";
import type { Context } from "../../context.js";
import { HashedUserPassword } from "../../model/User/HashedUserPassword.js";
import { NewUser } from "../../model/User/NewUser.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { UserName } from "../../model/User/UserName.js";
import { serializeUser } from "../../serializer/User.js";
import { defineRoute } from "../defineRoute.js";

export const createUser = defineRoute(
  ({ userRepository, serverKeyRepository, sessionService }: Context) => ({
    ...operations.createUser,
    handler: async (req, reply) => {
      const [eHandle, handle] = UserHandle.create(req.body.handle);

      if (eHandle) {
        return await reply.status(400).send();
      }

      const [eUserName, userName] = UserName.create(req.body.name);

      if (eUserName) {
        return await reply.status(400).send();
      }

      const [ePassword, password] = await HashedUserPassword.hash(
        req.body.password
      );

      if (ePassword) {
        return await reply.status(400).send();
      }

      const newUser = NewUser.create({
        handle,
        name: userName,
        password,
      });

      const [error, createdUser] = await userRepository.create(newUser);

      if (error) {
        return await reply.status(409).send();
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
