export class UserId {
  readonly #value?: number;

  private constructor(value?: number) {
    this.#value = value;
  }

  static from(value: number): UserId {
    return new UserId(value);
  }

  static empty(): UserId {
    return new UserId();
  }

  valueOf(): number {
    if (this.#value == null) {
      throw new Error("UserId: empty id");
    }
    return this.#value;
  }
}
