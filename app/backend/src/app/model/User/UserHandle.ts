const pattern = /^[a-zA-Z0-9_]{1,64}$/;

export class UserHandle extends String {
  private constructor(handle: string) {
    if (!pattern.test(handle)) {
      throw new TypeError("UserHandle: invalid pattern");
    }

    super(handle);
  }

  static from(handle: string): UserHandle | void {
    try {
      return new UserHandle(handle);
    } catch {
      return;
    }
  }
}
