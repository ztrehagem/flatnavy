import type { ClientResponse } from "@flatnavy/api/client";
import { TokenStore } from "../TokenStore.js";

export const fetchAsRevokeTokens = async (
  request: Request
): Promise<Response> => {
  const headers = new Headers(request.headers);

  const accessToken = TokenStore.instance.getAccessToken();

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

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
