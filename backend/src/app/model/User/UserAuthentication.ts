import type { HashedUserPassword } from "./HashedUserPassword.js";
import type { User } from "./User.js";

export type Params = {
  readonly user: User;
  readonly password: HashedUserPassword;
};

export class UserAuthentication {
  #_brand!: never;

  readonly user: User;
  readonly password: HashedUserPassword;

  static create(params: Params): UserAuthentication {
    return new UserAuthentication(params);
  }

  private constructor(params: Params) {
    this.user = params.user;
    this.password = params.password;
  }
}
