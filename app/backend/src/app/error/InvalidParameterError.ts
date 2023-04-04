export class InvalidParameterError extends Error {
  override name = "InvalidParameterError" as const;

  constructor(scope: string, message: string) {
    super(`${scope}: ${message}`);
  }
}
