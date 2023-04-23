import type { schemas } from "@flatnavy/api";
import type { Post } from "../model/Post/Post.js";
import { serializeUser } from "./User.js";

export const serializePost = (post: Post): schemas["Post"] => {
  return {
    id: post.postId.value,
    body: post.body,
    user: serializeUser(post.user),
  };
};
