export class UnexpectedError extends Error {
  constructor(cause: unknown) {
    super("Unexpected error occurred.");
    this.name = "UnexpectedError";
    this.cause = cause;
  }
}
