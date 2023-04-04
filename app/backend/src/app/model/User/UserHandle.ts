import { Brand } from "../../../utils/Brand.js";
import { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";

declare const brand: unique symbol;

type IUserHandle = {
  readonly value: string;
};

export type UserHandle = Brand<IUserHandle, typeof brand>;

const PATTERN = /^[a-zA-Z0-9_]{1,64}$/;

export const UserHandle = (
  value: string
): Result<UserHandle, InvalidParameterError> => {
  if (!PATTERN.test(value)) {
    return [new InvalidParameterError("UserHandle", "invalid pattern")];
  }

  const userHandle = {
    value,
  } satisfies IUserHandle as UserHandle;

  return [null, userHandle];
};
