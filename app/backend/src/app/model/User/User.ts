import { UserHandle } from "./UserHandle.js";
import { UserId } from "./UserId.js";

export type Params = {
  readonly id: UserId;
  readonly handle: UserHandle;
  readonly name: string | null;
};

export class User {
  readonly id: UserId;
  readonly handle: UserHandle;
  name: string | null;

  private constructor({ id, handle, name }: Params) {
    this.id = id;
    this.handle = handle;

    name = name?.trim() ?? null;
    if (name && name.length > 64) {
      throw new TypeError("User: too long name");
    }
    this.name = name;
  }

  static from(params: Params): User | void {
    try {
      return new User(params);
    } catch {
      return;
    }
  }
}
