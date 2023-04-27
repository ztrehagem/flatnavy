import type { Post } from "../../../app/model/Post/Post.js";

export type StreamRecord = {
  readonly postId: string;
};

export const serializePost = (post: Post): StreamRecord => {
  return { postId: post.postId.value.toString() };
};
