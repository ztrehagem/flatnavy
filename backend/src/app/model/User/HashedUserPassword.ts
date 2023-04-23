import { compare, hash } from "bcrypt";
import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";

const MAX_LENGTH = 64;
const ROUND = 10;

export class HashedUserPassword {
  #_brand!: never;

  readonly value: string;

  static create(hashed: string): HashedUserPassword {
    return new HashedUserPassword(hashed);
  }

  static async hash(
    raw: string
  ): Promise<Result<HashedUserPassword, InvalidParameterError>> {
    if (raw.length > MAX_LENGTH) {
      return [
        new InvalidParameterError(HashedUserPassword, "too long password"),
      ];
    }

    const hashed = await hash(raw, ROUND);

    return [null, HashedUserPassword.create(hashed)];
  }

  private constructor(hashed: string) {
    this.value = hashed;
  }

  compare(raw: string): Promise<boolean> {
    return compare(raw, this.value);
  }
}
