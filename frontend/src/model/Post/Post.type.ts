import type { Brand } from "../../lib/Brand.js";
import type { PostId } from "./PostId.type.js";

declare const brand: unique symbol;

type IPost = {
  readonly postId: PostId;
  readonly body: string;
};

export type Post = Brand<IPost, typeof brand>;

export type Params = {
  readonly postId: PostId;
  readonly body: string;
};

export const Post = ({ postId, body }: Params): Post => {
  return {
    postId,
    body,
  } satisfies IPost as Post;
};
