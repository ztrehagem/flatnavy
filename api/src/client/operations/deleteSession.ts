import type { ApiClientContext } from "../context.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import { createDetailedRequest } from "../request.js";
import type { Result } from "../types.js";

type ErrorType = UnexpectedResponseError;

export const deleteSession =
  (context: ApiClientContext) => async (): Promise<Result<null, ErrorType>> => {
    const { fetch } = createDetailedRequest(context, "/api/auth", "delete", {});

    const res = await fetch();

    switch (res.status) {
      case 204: {
        return [null, null];
      }

      default:
        return [new UnexpectedResponseError()];
    }
  };
