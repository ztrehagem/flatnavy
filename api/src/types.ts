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

export type PathParameters<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends { parameters: { path: infer U } } ? U : void;

export type QueryParameters<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends { parameters: { query: infer U } } ? U : void;

export type RequestBody<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends {
  requestBody?: { content: infer U };
}
  ? U
  : void;

export type AnyOfRequestBody<
  Path extends keyof paths,
  Method extends Exclude<keyof paths[Path], "parameters">
> = {
  [Mime in keyof RequestBody<Path, Method>]: {
    [K in Mime]: RequestBody<Path, Method>[Mime];
  };
}[keyof RequestBody<Path, Method>];

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
