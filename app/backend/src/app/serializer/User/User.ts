import type { schemas } from "@flatnavy/lib-api";
import type { User } from "../../model/User/User.js";

export const serializeUser = (user: User): schemas["User"] => {
  return {
    handle: user.handle.value,
    name: user.name,
  };
};
