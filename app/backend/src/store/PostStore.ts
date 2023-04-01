import EventEmitter from "events";
import { prisma } from "../db.js";

const EVENT_POST = "post";

export class PostStore {
  readonly #ee = new EventEmitter();

  static readonly global = new PostStore();

  private constructor() {
    // do nothing
  }

  pushPost(post: string): void {
    void prisma.post
      .create({
        data: {
          body: post,
        },
      })
      .then(() => {
        this.#ee.emit(EVENT_POST, post);
      });
  }

  on(eventName: typeof EVENT_POST, listener: (post: string) => void): void {
    this.#ee.on(eventName, listener);
  }

  off(eventName: typeof EVENT_POST, listener: (post: string) => void): void {
    this.#ee.off(eventName, listener);
  }
}
