import type {
  AnyRequestPayload,
  HttpMethod,
  PathParameters,
  QueryParameters,
  ResponsePayload,
  paths,
} from "@flatnavy/api";
import type { IncomingMessage, ServerResponse } from "http";

export type AbstractRequestContext<
  P = unknown,
  Q = unknown,
  B = unknown,
  R = AbstractDefineResponse
> = {
  pathParams: P;
  queryParams: Q;
  body: B;
  defineResponse: R;
};

export type RequestContext<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = AbstractRequestContext<
  PathParameters<Path, Method>,
  QueryParameters<Path, Method>,
  AnyRequestPayload<Path, Method>,
  DefineResponse<Path, Method>
>;

export type ValidationObject = {
  pathParams: unknown;
  queryParams: unknown;
  body: unknown;
};

export type Validator<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = (
  raw: ValidationObject
) => (keyof PathParameters<Path, Method> extends never
  ? object
  : { pathParams: PathParameters<Path, Method> }) &
  (keyof QueryParameters<Path, Method> extends never
    ? object
    : { queryParams: QueryParameters<Path, Method> }) &
  (AnyRequestPayload<Path, Method> extends never
    ? object
    : { body: AnyRequestPayload<Path, Method> });

export type AbstractResponse = {
  status: number;
  mime: string;
  body: unknown;
};

export type Response<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = {
  [Status in keyof ResponsePayload<Path, Method>]: {
    status: Status;
  } & {
    [Mime in keyof ResponsePayload<Path, Method>[Status]]: {
      mime: Mime;
      body: ResponsePayload<Path, Method>[Status][Mime];
    };
  }[keyof ResponsePayload<Path, Method>[Status]];
}[keyof ResponsePayload<Path, Method>];

export type AbstractDefineResponse<R = unknown> = (resp: R) => R;

export type DefineResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = AbstractDefineResponse<Response<Path, Method>>;

export type AbstractHandler<
  Ctx = AbstractRequestContext,
  Res = AbstractResponse
> = (
  ctx: Ctx,
  req: IncomingMessage,
  res: ServerResponse
) => Res | void | Promise<Res | void>;

export type Handler<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = AbstractHandler<RequestContext<Path, Method>, Response<Path, Method>>;

export type AbstractController<
  P = string,
  M = HttpMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V extends (obj: any) => any = (obj: ValidationObject) => ValidationObject,
  H = AbstractHandler
> = {
  path: P;
  method: M;
  validate: V;
  handler: H;
};

export type Controller<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = AbstractController<
  Path,
  Method,
  Validator<Path, Method>,
  Handler<Path, Method>
>;
