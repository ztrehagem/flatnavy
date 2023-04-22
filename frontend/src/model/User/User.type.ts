import type { Brand } from "../../lib/Brand.js";

declare const brand: unique symbol;

type IUser = {
  readonly handle: string;
  readonly name: string | null;
};

export type User = Brand<IUser, typeof brand>;

export type Params = {
  readonly handle: string;
  readonly name: string | null;
};

export const User = ({ handle, name }: Params): User => {
  return {
    handle,
    name,
  } satisfies IUser as User;
};
