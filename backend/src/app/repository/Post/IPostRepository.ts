import type { NewPost } from "../../model/Post/NewPost.js";
import type { Post } from "../../model/Post/Post.js";

export interface IPostRepository {
  create(newPost: NewPost): Promise<Post>;
}
