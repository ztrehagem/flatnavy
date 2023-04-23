export class UserId {
  #_brand!: never;

  readonly value: number;

  static create(value: number): UserId {
    return new UserId(value);
  }

  private constructor(value: number) {
    this.value = value;
  }
}
