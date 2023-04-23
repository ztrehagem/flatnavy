export class TimelineSubscription {
  #_brand!: never;

  readonly unsubscribe: () => void;

  static create(unsubscribe: () => void): TimelineSubscription {
    return new TimelineSubscription(unsubscribe);
  }

  private constructor(unsubscribe: () => void) {
    this.unsubscribe = unsubscribe;
  }
}
