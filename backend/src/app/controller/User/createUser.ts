import type { Context } from "../../context.js";
import { HashedUserPassword } from "../../model/User/HashedUserPassword.js";
import { NewUser } from "../../model/User/NewUser.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { UserName } from "../../model/User/UserName.js";
import { serializeUser } from "../../serializer/User.js";
import { defineController } from "../defineController.js";

export const createUser = defineController(
  ({ userRepository, serverKeyRepository, sessionService }: Context) => ({
    method: "post",
    path: "/api/users",
    handler: async ({ body, defineResponse }) => {
      const [eHandle, handle] = UserHandle.create(body.handle);

      if (eHandle) {
        return defineResponse({ status: 400 });
      }

      const [eUserName, userName] = UserName.create(body.name);

      if (eUserName) {
        return defineResponse({ status: 400 });
      }

      const [ePassword, password] = await HashedUserPassword.hash(
        body.password
      );

      if (ePassword) {
        return defineResponse({ status: 400 });
      }

      const newUser = NewUser.create({
        handle,
        name: userName,
        password,
      });

      const [error, createdUser] = await userRepository.create(newUser);

      if (error) {
        return defineResponse({ status: 409 });
      }

      const serverKey = await serverKeyRepository.get();
      const { accessToken, refreshToken } = await sessionService.createSession({
        user: createdUser,
      });
      const accessTokenJwt = await serverKey.signToken(accessToken);
      const refreshTokenJwt = await serverKey.signToken(refreshToken);

      return defineResponse({
        status: 201,
        mime: "application/json",
        body: {
          user: serializeUser(createdUser),
          accessToken: accessTokenJwt,
          refreshToken: refreshTokenJwt,
        },
      });
    },
  })
);
