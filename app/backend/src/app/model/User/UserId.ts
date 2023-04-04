import { Brand } from "../../../utils/Brand.js";

declare const brand: unique symbol;

type IUserId = {
  readonly value: number;
};

export type UserId = Brand<IUserId, typeof brand>;

export const UserId = (value: number): UserId => {
  return {
    value,
  } satisfies IUserId as UserId;
};

UserId.placeholder = (): UserId => {
  return {
    get value(): number {
      throw new Error("UserId: read placeholder");
    },
  } satisfies IUserId as UserId;
};
