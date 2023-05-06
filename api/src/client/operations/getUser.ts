import type { schemas } from "../../types.js";
import { NotFoundError } from "../error/NotFoundError.js";
import { UnexpectedResponseError, type ApiClientContext } from "../main.js";
import { createDetailedRequest } from "../request.js";
import type { Result } from "../types.js";

export type Params = {
  readonly userHandle: string;
};

type ErrorType = NotFoundError | UnexpectedResponseError;

export const getUser =
  (context: ApiClientContext) =>
  async (params: Params): Promise<Result<schemas["User"], ErrorType>> => {
    const { fetch } = createDetailedRequest(
      context,
      "/api/users/{userHandle}",
      "get",
      { params }
    );

    const res = await fetch();

    switch (res.status) {
      case 200: {
        const payload = await res.json();
        return [null, payload.user];
      }
      case 404: {
        return [new NotFoundError()];
      }
      default: {
        return [new UnexpectedResponseError()];
      }
    }
  };
