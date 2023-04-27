import type { Post } from "../Post/Post.js";

export type Params = {
  readonly id: string;
  readonly post: Post;
};

export class TimelineEntry {
  #_brand!: never;

  readonly id: string;
  readonly post: Post;

  static create(params: Params): TimelineEntry {
    return new TimelineEntry(params);
  }

  private constructor(params: Params) {
    this.id = params.id;
    this.post = params.post;
  }
}
