import type { paths } from "../spec.generated.js";
import type { Operation } from "../types.js";

export type Result<Data, Error extends NonNullable<unknown>> =
  | [Error]
  | [null | undefined, Data];

export interface TypedResponse<Status extends number, Body> extends Response {
  status: Status;
  json: () => Promise<Body>;
}

export type ClientResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = Operation<Method, Path> extends { responses: infer Responses }
  ? {
      [Status in keyof Responses]: Status extends number
        ? TypedResponse<
            Status,
            Responses[Status] extends {
              content: { [mime: string]: infer Schema };
            }
              ? Schema
              : never
          >
        : never;
    }[keyof Responses]
  : never;
