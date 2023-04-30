import { defineController } from "@flatnavy/api/server";

export const deleteSession = defineController(() => ({
  method: "delete",
  path: "/api/auth",
  handler: ({ defineResponse }) => {
    return defineResponse({ status: 204 });
  },
}));
