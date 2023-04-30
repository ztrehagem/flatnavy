import { defineController } from "../defineController.js";

export const deleteSession = defineController(() => ({
  method: "delete",
  path: "/api/auth",
  handler: ({ defineResponse }) => {
    return defineResponse({ status: 204 });
  },
}));
