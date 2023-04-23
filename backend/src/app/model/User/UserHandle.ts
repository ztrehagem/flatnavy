import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";

const PATTERN = /^[a-zA-Z0-9_]{1,64}$/;

export class UserHandle {
  #_brand!: never;

  readonly value: string;

  static create(value: string): Result<UserHandle, InvalidParameterError> {
    if (!PATTERN.test(value)) {
      return [new InvalidParameterError(UserHandle, "invalid pattern")];
    }

    return [null, new UserHandle(value)];
  }

  private constructor(value: string) {
    this.value = value;
  }
}
