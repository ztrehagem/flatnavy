import { UserHandle } from "../model/User/UserHandle.js";

export class UsedUserHandleError extends Error {
  readonly handle: UserHandle;

  constructor(handle: UserHandle, cause: unknown) {
    super("The specified user handle is already used.");
    this.name = "UsedUserHandleError";
    this.cause = cause;
    this.handle = handle;
  }
}
