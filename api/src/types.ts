import type { components, paths } from "./spec.generated.js";

export type { paths };

export type schemas = components["schemas"];

export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options";

export type Operation<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = {
  pathParams: PathParameters<Path, Method>;
  queryParams: QueryParameters<Path, Method>;
  requestPayload: RequestPayload<Path, Method>;
  responsePayload: ResponsePayload<Path, Method>;
};

export type PathParameters<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = (paths[Path] extends { parameters: { path: infer U } }
  ? U
  : Record<string, never>) &
  (paths[Path][Method] extends { parameters: { path: infer U } }
    ? U
    : Record<string, never>);

export type QueryParameters<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = (paths[Path] extends { parameters: { query: infer U } }
  ? U
  : Record<string, never>) &
  (paths[Path][Method] extends { parameters: { query: infer U } }
    ? U
    : Record<string, never>);

export type RequestPayload<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends {
  requestBody?: { content: infer U };
}
  ? U
  : never;

export type AnyRequestPayload<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = {
  [Mime in keyof RequestPayload<Path, Method>]: RequestPayload<
    Path,
    Method
  >[Mime];
}[keyof RequestPayload<Path, Method>];

export type ResponsePayload<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends {
  responses: infer Responses;
}
  ? Responses extends { [Status in keyof Responses]: { content: unknown } }
    ? { [Status in keyof Responses]: Responses[Status]["content"] }
    : never
  : never;
