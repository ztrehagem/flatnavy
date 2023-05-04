import type { schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import { UnexpectedResponseError } from "../error/UnexpectedResponseError.js";
import { createDetailedRequest } from "../request.js";
import type { Result } from "../types.js";

type ErrorType = UnexpectedResponseError;

export const indexUser =
  (context: ApiClientContext) =>
  async (): Promise<Result<schemas["User"][], ErrorType>> => {
    const { fetch } = createDetailedRequest(context, "/api/users", "get", {});

    const res = await fetch();

    switch (res.status) {
      case 200: {
        const payload = await res.json();
        return [null, payload.users];
      }

      default:
        return [new UnexpectedResponseError()];
    }
  };
