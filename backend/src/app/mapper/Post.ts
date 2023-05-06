import type * as prisma from "@prisma/client";
import { Post } from "../model/Post/Post.js";
import { PostId } from "../model/Post/PostId.js";
import type { UserRecord } from "./User.js";
import { mapUser } from "./User.js";

type PostRecord = Pick<prisma.Post, "id" | "body" | "createdAt"> & {
  user: UserRecord;
};

export const mapPost = (record: PostRecord): Post => {
  return Post.create({
    postId: PostId.create(record.id),
    body: record.body,
    dateTime: record.createdAt,
    user: mapUser(record.user),
  });
};
