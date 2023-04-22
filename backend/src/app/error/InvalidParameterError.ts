export class InvalidParameterError extends Error {
  override name = "InvalidParameterError" as const;

  constructor(scope: { readonly name: string }, message: string) {
    super(`(${scope.name}) ${message}`);
  }
}
