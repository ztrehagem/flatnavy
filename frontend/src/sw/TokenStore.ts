export class TokenStore {
  #accessToken: string | null = null;
  #refreshToken: string | null = null;

  static readonly instance = new TokenStore();

  private constructor() {
    /* do nothing */
  }

  setTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }): void {
    this.#accessToken = accessToken;
    this.#refreshToken = refreshToken;
  }

  clear(): void {
    this.#accessToken = null;
    this.#refreshToken = null;
  }

  getAccessToken(): string | null {
    return this.#accessToken;
  }

  getRefreshToken(): string | null {
    return this.#refreshToken;
  }
}
