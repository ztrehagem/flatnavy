import { compare, hash } from "bcrypt";

const round = 10;

export class HashedUserPassword extends String {
  private constructor(encrypted: string) {
    super(encrypted);
  }

  static async from(raw: string): Promise<HashedUserPassword> {
    const encrypted = await hash(raw, round);
    return new HashedUserPassword(encrypted);
  }

  async compare(raw: string): Promise<boolean> {
    return compare(raw, this.valueOf());
  }
}
