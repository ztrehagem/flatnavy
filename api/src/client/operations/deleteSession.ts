import type { ApiClientContext } from "../context.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import type { ClientResponse, Result } from "../types.js";
import { createRequestInit } from "../utils.js";

type ErrorType = UnexpectedResponseError;

export const deleteSession =
  (context: ApiClientContext) => async (): Promise<Result<null, ErrorType>> => {
    const request = createRequestInit(context, "/api/auth", "delete");

    const headers = new Headers(context.init?.headers);
    headers.set("Content-Type", "application/json");

    const res = (await fetch(request, {
      ...context.init,
      headers,
    })) as ClientResponse<"/api/auth", "delete">;

    switch (res.status) {
      case 204: {
        return [null, null];
      }

      default:
        return [new UnexpectedResponseError()];
    }
  };
