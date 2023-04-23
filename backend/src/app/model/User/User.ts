import type { UserHandle } from "./UserHandle.js";
import type { UserId } from "./UserId.js";
import type { UserName } from "./UserName.js";

export type Params = {
  readonly id: UserId;
  readonly handle: UserHandle;
  readonly name: UserName | null;
};

export class User {
  #_brand!: never;

  readonly id: UserId;
  readonly handle: UserHandle;
  readonly name: UserName | null;

  static create(params: Params): User {
    return new User(params);
  }

  private constructor(params: Params) {
    this.id = params.id;
    this.handle = params.handle;
    this.name = params.name;
  }
}
