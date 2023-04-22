import type { Brand } from "../../lib/Brand.js";

declare const brand: unique symbol;

type IPostId = {
  readonly value: number;
};

export type PostId = Brand<IPostId, typeof brand>;

export const PostId = (value: number): PostId => {
  return {
    value,
  } satisfies IPostId as PostId;
};
