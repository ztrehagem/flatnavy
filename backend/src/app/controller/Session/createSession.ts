import type { Context } from "../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { serializeUser } from "../../serializer/User.js";
import { defineController } from "../defineController.js";

export const createSession = defineController(
  ({ userRepository, serverKeyRepository, sessionService }: Context) => ({
    method: "post",
    path: "/api/auth",
    handler: async ({ body, defineResponse }) => {
      const [eHandle, handle] = UserHandle.create(body.handle);

      if (eHandle) {
        return defineResponse({ status: 400 });
      }

      const authentication = await userRepository.getUserAuthenticationByHandle(
        handle
      );

      if (!authentication) {
        return defineResponse({ status: 400 });
      }

      const isMatched = await authentication.password.compare(body.password);

      if (!isMatched) {
        return defineResponse({ status: 400 });
      }

      const { accessToken, refreshToken } = await sessionService.createSession({
        user: authentication.user,
      });
      const serverKey = await serverKeyRepository.get();
      const accessTokenJwt = await serverKey.signToken(accessToken);
      const refreshTokenJwt = await serverKey.signToken(refreshToken);

      return defineResponse({
        status: 201,
        mime: "application/json",
        body: {
          user: serializeUser(authentication.user),
          accessToken: accessTokenJwt,
          refreshToken: refreshTokenJwt,
        },
      });
    },
  })
);
