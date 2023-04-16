import { compare, hash } from "bcrypt";
import type { Brand } from "../../../utils/Brand.js";
import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";

declare const brand: unique symbol;

type IHashedUserPassword = {
  readonly value: string;
  compare(raw: string): Promise<boolean>;
};

export type HashedUserPassword = Brand<IHashedUserPassword, typeof brand>;

const MAX_LENGTH = 64;
const ROUND = 10;

export const HashedUserPassword = async (
  raw: string
): Promise<Result<HashedUserPassword, InvalidParameterError>> => {
  if (raw.length > MAX_LENGTH) {
    return [
      new InvalidParameterError("HashedUserPassword", "too long password"),
    ];
  }

  const value = await hash(raw, ROUND);

  const result = {
    value,
    compare: (raw) => compare(raw, value),
  } satisfies IHashedUserPassword as HashedUserPassword;

  return [null, result];
};
