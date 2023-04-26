export class TimelineSubscription {
  #_brand!: never;

  readonly #abortController: AbortController;

  static create(abortController: AbortController): TimelineSubscription {
    return new TimelineSubscription(abortController);
  }

  private constructor(abortController: AbortController) {
    this.#abortController = abortController;
  }

  unsubscribe(): void {
    this.#abortController.abort();
  }
}
