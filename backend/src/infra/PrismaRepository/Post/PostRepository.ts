import type * as prisma from "@prisma/client";
import type { IPostRepository } from "../../../app/repository/Post/IPostRepository.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import type { NewPost } from "../../../app/model/Post/NewPost.js";
import { Post } from "../../../app/model/Post/Post.js";
import { PostId } from "../../../app/model/Post/PostId.js";

export class PostRepository implements IPostRepository {
  readonly #prisma: prisma.PrismaClient;

  constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }

  async create(newPost: NewPost): Promise<Post> {
    const post = await this.#prisma.post.create({
      data: {
        body: newPost.body,
        userId: newPost.user.id.value,
      },
      select: {
        id: true,
        body: true,
      },
    });

    return Post.create({
      postId: PostId.create(post.id),
      body: post.body,
      user: newPost.user,
    });
  }
}
