import type { ApiClientContext } from "../context.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import { createDetailedRequest } from "../request.js";
import { LocalStorageTokenStore } from "../store/TokenStore.js";
import type { Result } from "../types.js";

type ErrorType = UnexpectedResponseError;

export const deleteSession =
  (context: ApiClientContext) => async (): Promise<Result<null, ErrorType>> => {
    const tokenStore = context.tokenStore ?? LocalStorageTokenStore.shared;

    const { fetch } = createDetailedRequest(context, "/api/auth", "delete", {});

    const res = await fetch();

    switch (res.status) {
      case 204: {
        tokenStore.clear();
        return [null, null];
      }

      default:
        return [new UnexpectedResponseError()];
    }
  };
