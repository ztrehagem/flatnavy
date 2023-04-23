import { randomUUID } from "crypto";

export class SessionId {
  #_brand!: never;

  readonly value: string;

  static generate(): SessionId {
    return this.create(randomUUID());
  }

  static create(value: string): SessionId {
    return new SessionId(value);
  }

  private constructor(value: string) {
    this.value = value;
  }
}
