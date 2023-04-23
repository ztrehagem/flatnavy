import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";

const MAX_LENGTH = 64;

export class UserName {
  #_brand!: never;

  readonly value: string;

  static create(value: string): Result<UserName, InvalidParameterError> {
    value = value.trim();

    if (value.length > MAX_LENGTH) {
      return [new InvalidParameterError(UserName, "too long")];
    }

    return [null, new UserName(value)];
  }

  private constructor(value: string) {
    this.value = value;
  }
}
