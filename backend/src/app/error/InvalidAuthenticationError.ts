export class InvalidAuthenticationError extends Error {
  override name = "InvalidAuthenticationError" as const;

  constructor(scope: string, message: string) {
    super(`${scope}: ${message}`);
  }
}
