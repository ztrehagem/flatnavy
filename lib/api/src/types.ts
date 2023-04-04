import { components, paths } from "./spec.generated.js";

export type schemas = components["schemas"];

export type Operation<
  Method extends keyof paths[Path],
  Path extends keyof paths
> = paths[Path][Method];

export type RequestPayload<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = Operation<Method, Path> extends {
  requestBody?: { content: infer U };
}
  ? U
  : never;

export type ResponsePayload<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = Operation<Method, Path> extends {
  responses: infer Responses;
}
  ? Responses extends { [Status in keyof Responses]: { content: unknown } }
    ? { [Status in keyof Responses]: Responses[Status]["content"] }
    : never
  : never;
