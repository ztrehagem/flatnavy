import type { ClientResponse } from "@flatnavy/api/client";
import { TokenStore } from "../TokenStore.js";

export const fetchAsRevokeTokens = async (
  request: Request
): Promise<Response> => {
  const headers = new Headers(request.headers);

  headers.set(
    "Authorization",
    `Bearer ${TokenStore.instance.getAccessToken() ?? ""}`
  );

  const response = (await fetch(request, {
    headers,
  })) as ClientResponse<"/api/auth", "delete">;

  switch (response.status) {
    case 204: {
      TokenStore.instance.clear();
      return response;
    }
    default: {
      return response;
    }
  }
};
