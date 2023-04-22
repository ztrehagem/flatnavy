import type { RequestPayload, schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import { InvalidParametersError } from "../error/InvalidParametersError.js";
import { UnauthenticatedError } from "../error/UnauthenticatedError.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import type { ClientResponse, Result } from "../types.js";
import { createRequestInit } from "../utils.js";

type Params = {
  readonly body: string;
};

type ErrorType =
  | InvalidParametersError
  | UnauthenticatedError
  | UnexpectedResponseError;

export const createPost =
  (context: ApiClientContext) =>
  async (params: Params): Promise<Result<schemas["Post"], ErrorType>> => {
    const request = createRequestInit(context, "/api/posts", "post");

    const body: RequestPayload<"/api/posts", "post">["application/json"] = {
      body: params.body,
    };

    const headers = new Headers(context.init?.headers);
    headers.set("Content-Type", "application/json");

    const res = (await fetch(request, {
      ...context.init,
      headers,
      body: JSON.stringify(body),
    })) as ClientResponse<"/api/posts", "post">;

    switch (res.status) {
      case 201: {
        const payload = await res.json();
        return [null, payload.post];
      }

      case 400: {
        return [new InvalidParametersError()];
      }

      case 401: {
        return [new UnauthenticatedError()];
      }

      default:
        return [new UnexpectedResponseError()];
    }
  };
