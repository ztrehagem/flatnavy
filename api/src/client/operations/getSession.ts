import type { schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import { UnauthenticatedError } from "../error/UnauthenticatedError.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import { createDetailedRequest } from "../request.js";
import type { Result } from "../types.js";

type ErrorType = UnauthenticatedError | UnexpectedResponseError;

export const getSession =
  (context: ApiClientContext) =>
  async (): Promise<Result<schemas["User"], ErrorType>> => {
    const { fetch } = createDetailedRequest(context, "/api/auth", "get", {});

    const res = await fetch();

    switch (res.status) {
      case 200: {
        const payload = await res.json();
        return [null, payload.user];
      }

      case 401: {
        return [new UnauthenticatedError()];
      }

      default:
        return [new UnexpectedResponseError()];
    }
  };
