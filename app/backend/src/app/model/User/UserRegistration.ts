import { HashedUserPassword } from "./HashedUserPassword.js";
import { User } from "./User.js";

export type Params = {
  readonly user: User;
  readonly password: HashedUserPassword;
};

export class UserRegistration {
  readonly user: User;
  password: HashedUserPassword;

  constructor({ user, password }: Params) {
    this.user = user;
    this.password = password;
  }
}
