import { defineController } from "../defineController.js";

export const deleteSession = defineController(() => ({
  method: "delete",
  path: "/api/auth",
  validate: () => ({}),
  handler: ({ defineResponse }) => {
    return defineResponse({ status: 204 });
  },
}));
