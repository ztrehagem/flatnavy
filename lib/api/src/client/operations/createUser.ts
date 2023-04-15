import type { RequestPayload, schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import type { ClientResponse, Result } from "../types.js";
import { createRequestInit } from "../utils.js";

type Params = {
  readonly handle: string;
  readonly name: string;
  readonly password: string;
};

type ErrorType =
  | "InvalidParameters"
  | "ConflictedUserHandle"
  | "UnexpectedResponse";

export const createUser =
  (context: ApiClientContext) =>
  async (params: Params): Promise<Result<schemas["User"], ErrorType>> => {
    const request = createRequestInit(context, "/api/users", "post");

    const body: RequestPayload<"/api/users", "post">["application/json"] = {
      handle: params.handle,
      name: params.name,
      password: params.password,
    };

    const res = (await fetch(request, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })) as ClientResponse<"/api/users", "post">;

    switch (res.status) {
      case 201: {
        const payload = await res.json();
        return [null, payload.user];
      }

      case 400: {
        return ["InvalidParameters"];
      }

      case 409: {
        return ["ConflictedUserHandle"];
      }

      default:
        return ["UnexpectedResponse"];
    }
  };
