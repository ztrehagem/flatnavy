import type { schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import type { ClientResponse, Result } from "../types.js";
import { createRequestInit } from "../utils.js";

type ErrorType = UnexpectedResponseError;

export const indexUser =
  (context: ApiClientContext) =>
  async (): Promise<Result<schemas["User"][], ErrorType>> => {
    const request = createRequestInit(context, "/api/users", "get");

    const headers = new Headers(context.init?.headers);
    headers.set("Content-Type", "application/json");

    const res = (await fetch(request, {
      ...context.init,
      headers,
    })) as ClientResponse<"/api/users", "get">;

    switch (res.status) {
      case 200: {
        const payload = await res.json();
        return [null, payload.users];
      }

      default:
        return [new UnexpectedResponseError()];
    }
  };
