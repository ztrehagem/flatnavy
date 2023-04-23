import type { HashedUserPassword } from "./HashedUserPassword.js";
import type { UserHandle } from "./UserHandle.js";
import type { UserName } from "./UserName.js";

export type Params = {
  readonly handle: UserHandle;
  readonly name: UserName;
  readonly password: HashedUserPassword;
};

export class NewUser {
  #_brand!: never;

  readonly handle: UserHandle;
  readonly name: UserName;
  readonly password: HashedUserPassword;

  static create(params: Params): NewUser {
    return new NewUser(params);
  }

  private constructor(params: Params) {
    this.handle = params.handle;
    this.name = params.name;
    this.password = params.password;
  }
}
