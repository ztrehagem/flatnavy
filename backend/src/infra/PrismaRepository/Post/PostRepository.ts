import type * as prisma from "@prisma/client";
import type { IPostRepository } from "../../../app/repository/Post/IPostRepository.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import type { NewPost } from "../../../app/model/Post/NewPost.js";
import { Post } from "../../../app/model/Post/Post.js";
import { PostId } from "../../../app/model/Post/PostId.js";
import type { RedisClientType } from "redis";

export class PostRepository implements IPostRepository {
  readonly #prisma: prisma.PrismaClient;
  readonly #redis: RedisClientType;

  constructor({ prisma, redis }: PrismaRepositoryContext) {
    this.#prisma = prisma;
    this.#redis = redis;
  }

  async create(newPost: NewPost): Promise<Post> {
    const record = await this.#prisma.post.create({
      data: {
        body: newPost.body,
        userId: newPost.user.id.value,
      },
      select: {
        id: true,
        body: true,
        createdAt: true,
      },
    });

    const post = Post.create({
      postId: PostId.create(record.id),
      body: record.body,
      user: newPost.user,
      dateTime: record.createdAt,
    });

    // TODO: encapsulation
    await this.#redis.xAdd(
      "timeline:local",
      "*",
      {
        id: post.postId.value.toString(),
        body: post.body,
        author: post.user.handle.value,
        authorName: post.user.name?.value ?? "",
        at: post.dateTime.toString(),
      },
      {
        TRIM: {
          strategy: "MAXLEN",
          strategyModifier: "~",
          threshold: 1000,
        },
      }
    );

    return post;
  }
}
