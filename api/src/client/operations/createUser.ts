import type { schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import { ConflictedError } from "../error/ConflictedError.js";
import { InvalidParametersError } from "../error/InvalidParametersError.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import { createDetailedRequest } from "../request.js";
import { LocalStorageTokenStore } from "../store/TokenStore.js";
import type { Result } from "../types.js";

export type Params = {
  readonly handle: string;
  readonly name: string;
  readonly password: string;
};

export type Return = {
  user: schemas["User"];
};

export type ErrorType =
  | InvalidParametersError
  | ConflictedError
  | UnexpectedResponseError;

export const createUser =
  (context: ApiClientContext) =>
  async (params: Params): Promise<Result<Return, ErrorType>> => {
    const tokenStore = context.tokenStore ?? LocalStorageTokenStore.shared;

    const { fetch } = createDetailedRequest(context, "/api/users", "post", {
      body: {
        "application/json": params,
      },
    });

    const res = await fetch();

    switch (res.status) {
      case 201: {
        tokenStore.setTokens({
          accessToken: res.headers.get("X-Access-Token") ?? "",
          refreshToken: res.headers.get("X-Refresh-Token") ?? "",
        });
        const payload = await res.json();
        return [null, payload];
      }

      case 400: {
        return [new InvalidParametersError()];
      }

      case 409: {
        return [new ConflictedError()];
      }

      default:
        return [new UnexpectedResponseError()];
    }
  };
