import type { paths } from "../spec.generated.js";
import type { ApiClientContext } from "./context.js";

export const createRequestInit = <
  Path extends keyof paths,
  Method extends keyof paths[Path]
>(
  context: ApiClientContext,
  path: Path,
  method: Method
): Request => {
  const url = new URL(path, context.origin);

  return new Request(url, {
    method: String(method).toUpperCase(),
  });
};
