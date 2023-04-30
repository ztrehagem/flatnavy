import { logInfo } from "../../../utils/log.js";
import type { Context } from "../../context.js";
import { serializeUser } from "../../serializer/User.js";
import { defineController } from "../defineController.js";

export const getSession = defineController(
  ({ httpAuthenticationService, userRepository }: Context) => ({
    method: "get",
    path: "/api/auth",
    handler: async ({ defineResponse }, req) => {
      const [authenticationError, token] =
        await httpAuthenticationService.parseAuthenticationToken(
          req.headers.authorization ?? ""
        );

      if (authenticationError) {
        logInfo(authenticationError);
        return defineResponse({ status: 401 });
      }

      const user = await userRepository.getByHandle(token.userHandle);

      if (!user) {
        return defineResponse({ status: 401 });
      }

      return defineResponse({
        status: 200,
        mime: "application/json",
        body: {
          user: serializeUser(user),
        },
      });
    },
  })
);
