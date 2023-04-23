export class UnauthenticatedError extends Error {
  override name = "UnauthenticatedError" as const;
}
