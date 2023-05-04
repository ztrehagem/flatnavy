import type { paths } from "../spec.generated.js";
import type {
  AnyOfRequestBody,
  PathParameters,
  QueryParameters,
} from "../types.js";
import type { ApiClientContext } from "./context.js";
import type { ClientResponse } from "./types.js";

export const createDetailedRequest = <
  Path extends keyof paths,
  Method extends Exclude<keyof paths[Path], "parameters">
>(
  context: ApiClientContext,
  path: Path,
  method: Method,
  data: RequestData<{
    params: PathParameters<Path, Method>;
    query: QueryParameters<Path, Method>;
    body: AnyOfRequestBody<Path, Method>;
  }>,
  options?: RequestOptions<Path, Method>
): DetailedRequest<Path, Method> => {
  let filledPathString: string = path;

  if ("params" in data) {
    const params = data.params as Record<string, unknown>;
    filledPathString = path.replace(/{([^}]+)}/g, (_, name: string) =>
      String(params[name])
    );
  }

  const url = new URL(filledPathString, context.origin);

  if ("query" in data) {
    const query = data.query as Record<string, unknown>;

    for (const [name, value] of Object.entries(query)) {
      const values = Array.isArray(value) ? value : [value];

      for (const value of values) {
        url.searchParams.append(name, String(value));
      }
    }
  }

  const headers = new Headers();
  let bodyInit: BodyInit | undefined;

  if ("body" in data) {
    const serialize =
      (options?.serializeBody as (body: unknown) => BodyInit) ?? JSON.stringify;
    const bodyContent = data.body as Record<string, unknown>;
    const [[mime, body]] = Object.entries(bodyContent);
    headers.set("Content-Type", mime);
    bodyInit = serialize(body);
  }

  const init: RequestInit = {
    method: String(method).toUpperCase(),
    headers,
    body: bodyInit,
  };

  const request = new Request(url, init);

  return {
    fetch: (init) =>
      fetch(request, init) as Promise<ClientResponse<Path, Method>>,
    init,
  };
};

type RequestData<T extends Record<"params" | "query" | "body", unknown>> = Pick<
  T,
  { [K in keyof T]: Exclude<T[K], void> extends never ? never : K }[keyof T]
>;

type RequestOptions<
  Path extends keyof paths,
  Method extends Exclude<keyof paths[Path], "parameters">
> = {
  serializeBody?: BodySerializer<Path, Method>;
};

type BodySerializer<
  Path extends keyof paths,
  Method extends Exclude<keyof paths[Path], "parameters">
> = (body: AnyOfRequestBody<Path, Method>) => BodyInit;

type DetailedRequest<
  Path extends keyof paths,
  Method extends Exclude<keyof paths[Path], "parameters">
> = {
  fetch: BoundFetch<Path, Method>;
  init: RequestInit;
};

type BoundFetch<
  Path extends keyof paths,
  Method extends Exclude<keyof paths[Path], "parameters">
> = (init?: RequestInit) => Promise<ClientResponse<Path, Method>>;
