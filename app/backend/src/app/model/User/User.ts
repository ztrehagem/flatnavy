import { Brand } from "../../../utils/Brand.js";
import { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";
import { UserHandle } from "./UserHandle.js";
import { UserId } from "./UserId.js";

declare const brand: unique symbol;

type IUser = {
  readonly id: UserId;
  readonly handle: UserHandle;
  readonly name: string | null;
};

export type User = Brand<IUser, typeof brand>;

export type Params = {
  readonly id: UserId;
  readonly handle: UserHandle;
  readonly name: string | null;
};

const NAME_MAX_LENGTH = 64;

export const User = ({
  id,
  handle,
  name,
}: Params): Result<User, InvalidParameterError> => {
  name = name?.trim() ?? null;

  if (name && name.length > NAME_MAX_LENGTH) {
    return [new InvalidParameterError("User#name", "too long name")];
  }

  const user = {
    id,
    handle,
    name,
  } satisfies IUser as User;

  return [null, user];
};
