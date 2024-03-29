import { FlatNavyHttpHeader } from "../../main.js";
import type { schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import { InvalidParametersError } from "../error/InvalidParametersError.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import { createDetailedRequest } from "../request.js";
import { LocalStorageTokenStore } from "../store/TokenStore.js";
import type { Result } from "../types.js";

export type Params = {
  readonly handle: string;
  readonly password: string;
};

export type Return = {
  user: schemas["User"];
};

export type ErrorType = InvalidParametersError | UnexpectedResponseError;

export const createSession =
  (context: ApiClientContext) =>
  async (params: Params): Promise<Result<Return, ErrorType>> => {
    const tokenStore = context.tokenStore ?? LocalStorageTokenStore.shared;

    const { fetch } = createDetailedRequest(context, "/api/auth", "post", {
      body: {
        "application/json": params,
      },
    });

    const res = await fetch();

    switch (res.status) {
      case 201: {
        tokenStore.setTokens({
          accessToken: res.headers.get(FlatNavyHttpHeader.accessToken) ?? "",
          refreshToken: res.headers.get(FlatNavyHttpHeader.refreshToken) ?? "",
        });
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
