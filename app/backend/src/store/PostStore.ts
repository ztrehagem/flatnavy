import EventEmitter from "events";

const EVENT_POST = "post";

export class PostStore {
  readonly #ee = new EventEmitter();

  static readonly global = new PostStore();

  private constructor() {}

  pushPost(post: string): void {
    this.#ee.emit(EVENT_POST, post);
  }

  on(eventName: typeof EVENT_POST, listener: (post: string) => void) {
    this.#ee.on(eventName, listener);
  }

  off(eventName: typeof EVENT_POST, listener: (post: string) => void) {
    this.#ee.off(eventName, listener);
  }
}
