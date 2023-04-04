import { schemas } from "@flatnavy/lib-api";
import { User } from "../../model/User/User.js";

export const serializeUser = (user: User): schemas["User"] => {
  return {
    handle: user.handle.value,
    name: user.name,
  };
};
