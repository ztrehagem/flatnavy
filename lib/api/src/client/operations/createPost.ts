import type { RequestPayload, schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import type { ClientResponse, Result } from "../types.js";
import { createRequestInit } from "../utils.js";

type Params = {
  readonly body: string;
};

type ErrorType = "InvalidParameters" | "UnexpectedResponse";

export const createPost =
  (context: ApiClientContext) =>
  async (params: Params): Promise<Result<schemas["Post"], ErrorType>> => {
    const request = createRequestInit(context, "/api/posts", "post");

    const body: RequestPayload<"/api/posts", "post">["application/json"] = {
      body: params.body,
    };

    const res = (await fetch(request, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })) as ClientResponse<"/api/posts", "post">;

    switch (res.status) {
      case 201: {
        const payload = await res.json();
        return [null, payload.post];
      }

      case 400: {
        return ["InvalidParameters"];
      }

      default:
        return ["UnexpectedResponse"];
    }
  };
