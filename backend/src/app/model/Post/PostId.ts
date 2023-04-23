export class PostId {
  #_brand!: never;

  readonly value: number;

  static create(value: number): PostId {
    return new PostId(value);
  }

  private constructor(value: number) {
    this.value = value;
  }
}
