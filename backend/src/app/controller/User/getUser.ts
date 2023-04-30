import { z } from "zod";
import type { Context } from "../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { serializeUser } from "../../serializer/User.js";
import { defineController } from "../defineController.js";

export const getUser = defineController(({ userRepository }: Context) => ({
  method: "get",
  path: "/api/users/{userHandle}",
  validate: ({ pathParams }) => ({
    pathParams: z
      .object({
        userHandle: z.string(),
      })
      .parse(pathParams),
  }),
  handler: async ({ pathParams, defineResponse }) => {
    const [eUserHandle, userHandle] = UserHandle.create(pathParams.userHandle);

    if (eUserHandle) {
      return defineResponse({ status: 400 });
    }

    const user = await userRepository.getByHandle(userHandle);

    if (!user) {
      return defineResponse({ status: 404 });
    }

    return defineResponse({
      status: 200,
      mime: "application/json",
      body: {
        user: serializeUser(user),
      },
    });
  },
}));
