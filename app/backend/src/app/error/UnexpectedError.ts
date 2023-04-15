export class UnexpectedError extends Error {
  override name = "UnexpectedError" as const;

  constructor(cause: unknown) {
    super("Unexpected error occurred.", { cause });
  }
}
