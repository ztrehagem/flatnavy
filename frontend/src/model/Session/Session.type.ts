import type { Brand } from "../../lib/Brand.js";
import type { User } from "../User/User.type.js";

declare const brand: unique symbol;

type ISession = {
  readonly user: User;
};

export type Session = Brand<ISession, typeof brand>;

export type Params = {
  readonly user: User;
};

export const Session = ({ user }: Params): Session => {
  return {
    user,
  } satisfies ISession as Session;
};
