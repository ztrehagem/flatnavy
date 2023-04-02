import { HashedUserPassword } from "./HashedUserPassword.js";
import { User } from "./User.js";

export type Params = {
  readonly user: User;
  readonly password: HashedUserPassword;
};

export class UserRegistration {
  readonly user: User;
  password: HashedUserPassword;

  private constructor({ user, password }: Params) {
    this.user = user;
    this.password = password;
  }

  static from(params: Params): UserRegistration {
    return new UserRegistration(params);
  }
}
