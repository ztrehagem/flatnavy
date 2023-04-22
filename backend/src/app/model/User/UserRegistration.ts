import type { Brand } from "../../../utils/Brand.js";
import type { HashedUserPassword } from "./HashedUserPassword.js";
import type { User } from "./User.js";

declare const brand: unique symbol;

type IUserRegistration = {
  readonly user: User;
  readonly password: HashedUserPassword;
};

export type UserRegistration = Brand<IUserRegistration, typeof brand>;

export type Params = {
  readonly user: User;
  readonly password: HashedUserPassword;
};

export const UserRegistration = (params: Params): UserRegistration => {
  return {
    user: params.user,
    password: params.password,
  } satisfies IUserRegistration as UserRegistration;
};
