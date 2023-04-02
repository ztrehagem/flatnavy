const pattern = /^[a-zA-Z0-9_]{1,64}$/;

export class UserHandle extends String {
  constructor(handle: string) {
    if (!pattern.test(handle)) {
      throw new TypeError("UserHandle: invalid pattern");
    }

    super(handle);
  }
}
