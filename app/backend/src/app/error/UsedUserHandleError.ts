import type { UserHandle } from "../model/User/UserHandle.js";

export class UsedUserHandleError extends Error {
  override name = "UsedUserHandleError" as const;

  readonly handle: UserHandle;

  constructor(handle: UserHandle, cause: unknown) {
    super("The specified user handle is already used.", { cause });
    this.handle = handle;
  }
}
