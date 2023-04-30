import type { Context } from "../../context.js";
import { serializeUser } from "../../serializer/User.js";
import { defineController } from "../defineController.js";

export const indexUser = defineController(({ userRepository }: Context) => ({
  method: "get",
  path: "/api/users",
  validate: () => ({}),
  handler: async ({ defineResponse }) => {
    const users = await userRepository.index();

    return defineResponse({
      status: 200,
      mime: "application/json",
      body: {
        users: users.map(serializeUser),
      },
    });
  },
}));
