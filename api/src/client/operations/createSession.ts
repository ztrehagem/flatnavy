import type { RequestPayload, schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import { InvalidParametersError } from "../error/InvalidParametersError.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import type { ClientResponse, Result } from "../types.js";
import { createRequestInit } from "../utils.js";

export type Params = {
  readonly handle: string;
  readonly password: string;
};

export type Return = {
  user: schemas["User"];
  accessToken: string;
  refreshToken: string;
};

export type ErrorType = InvalidParametersError | UnexpectedResponseError;

export const createSession =
  (context: ApiClientContext) =>
  async (params: Params): Promise<Result<Return, ErrorType>> => {
    const request = createRequestInit(context, "/api/auth", "post");

    const body: RequestPayload<"/api/auth", "post">["application/json"] = {
      handle: params.handle,
      password: params.password,
    };

    const headers = new Headers(context.init?.headers);
    headers.set("Content-Type", "application/json");

    const res = (await fetch(request, {
      ...context.init,
      headers,
      body: JSON.stringify(body),
    })) as ClientResponse<"/api/auth", "post">;

    switch (res.status) {
      case 201: {
        const payload = await res.json();
        return [null, payload];
      }

      case 400: {
        return [new InvalidParametersError()];
      }

      default: {
        return [new UnexpectedResponseError()];
      }
    }
  };
