export class AuthenticationError extends Error {
  override name = "AuthenticationError" as const;

  constructor(scope: { readonly name: string }, message: string) {
    super(`(${scope.name}) ${message}`);
  }
}
