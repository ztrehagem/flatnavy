import type { schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import { InvalidParametersError } from "../error/InvalidParametersError.js";
import { UnauthenticatedError } from "../error/UnauthenticatedError.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import { createDetailedRequest } from "../request.js";
import type { Result } from "../types.js";

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
    const { fetch } = createDetailedRequest(context, "/api/posts", "post", {
      body: {
        "application/json": {
          body: params.body,
        },
      },
    });

    const res = await fetch();

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
