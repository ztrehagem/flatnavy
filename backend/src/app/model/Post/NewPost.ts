import type { User } from "../User/User.js";

const BODY_MAX_LENGTH = 256;

export type Params = {
  readonly user: User;
  readonly body: string;
};

export class NewPost {
  #_brand!: never;

  readonly user: User;
  readonly body: string;

  static create(params: Params): NewPost | void {
    if (params.body.length > BODY_MAX_LENGTH) {
      return;
    }

    return new NewPost(params);
  }

  private constructor(params: Params) {
    this.user = params.user;
    this.body = params.body;
  }
}
