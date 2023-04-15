import type { schemas } from "../../types.js";
import type { ApiClientContext } from "../context.js";
import type { ClientResponse, Result } from "../types.js";
import { createRequestInit } from "../utils.js";

type ErrorType = "UnexpectedResponse";

export const indexUser =
  (context: ApiClientContext) =>
  async (): Promise<Result<schemas["User"][], ErrorType>> => {
    const request = createRequestInit(context, "/api/users", "get");

    const res = (await fetch(request, {
      headers: {
        "Content-Type": "application/json",
      },
    })) as ClientResponse<"/api/users", "get">;

    switch (res.status) {
      case 200: {
        const payload = await res.json();
        return [null, payload.users];
      }

      default:
        return ["UnexpectedResponse"];
    }
  };
