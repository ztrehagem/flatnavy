export type Tokens = {
  readonly accessToken: string;
  readonly refreshToken: string;
};

export interface ITokenStore {
  setTokens(tokens: Tokens): void;
  clear(): void;
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
}

export class LocalStorageTokenStore implements ITokenStore {
  static #shared: LocalStorageTokenStore | undefined;
  static get shared(): LocalStorageTokenStore {
    return this.#shared ?? new LocalStorageTokenStore();
  }

  #accessToken: string | null = null;
  #refreshToken: string | null = null;

  setTokens({ accessToken, refreshToken }: Tokens): void {
    this.#accessToken = accessToken;
    this.#refreshToken = refreshToken;

    localStorage.setItem(Key.accessToken, accessToken);
    localStorage.setItem(Key.refreshToken, refreshToken);
  }

  clear(): void {
    this.#accessToken = null;
    this.#refreshToken = null;

    localStorage.removeItem(Key.accessToken);
    localStorage.removeItem(Key.refreshToken);
  }

  getAccessToken(): string | null {
    return this.#accessToken ?? localStorage.getItem(Key.accessToken);
  }

  getRefreshToken(): string | null {
    return this.#refreshToken ?? localStorage.getItem(Key.refreshToken);
  }
}

enum Key {
  accessToken = "FlatNavy.accessToken",
  refreshToken = "FlatNavy.refreshToken",
}
