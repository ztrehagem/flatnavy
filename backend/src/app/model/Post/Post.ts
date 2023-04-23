import { Temporal } from "@js-temporal/polyfill";
import type { User } from "../User/User.js";
import type { PostId } from "./PostId.js";

export type Params = {
  readonly postId: PostId;
  readonly user: User;
  readonly body: string;
  readonly dateTime: Date | Temporal.Instant;
};

export class Post {
  #_brand!: never;

  readonly postId: PostId;
  readonly user: User;
  readonly body: string;
  readonly dateTime: Temporal.Instant;

  static create(params: Params): Post {
    return new Post(params);
  }

  private constructor(params: Params) {
    this.postId = params.postId;
    this.user = params.user;
    this.body = params.body;
    this.dateTime =
      params.dateTime instanceof Date
        ? Temporal.Instant.fromEpochMilliseconds(params.dateTime.valueOf())
        : params.dateTime;
  }
}
