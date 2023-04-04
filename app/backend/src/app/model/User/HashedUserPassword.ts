import { compare, hash } from "bcrypt";
import { Brand } from "../../../utils/Brand.js";

declare const brand: unique symbol;

type IHashedUserPassword = {
  readonly value: string;
  compare(raw: string): Promise<boolean>;
};

export type HashedUserPassword = Brand<IHashedUserPassword, typeof brand>;

const ROUND = 10;

export const HashedUserPassword = async (
  raw: string
): Promise<HashedUserPassword> => {
  const value = await hash(raw, ROUND);

  return {
    value,
    compare: (raw) => compare(raw, value),
  } satisfies IHashedUserPassword as HashedUserPassword;
};
