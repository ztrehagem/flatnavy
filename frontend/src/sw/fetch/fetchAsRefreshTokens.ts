import type { ClientResponse } from "@flatnavy/api/client";
import { TokenStore } from "../TokenStore.js";

export const fetchAsRefreshTokens = async (
  request: Request
): Promise<Response> => {
  const headers = new Headers(request.headers);

  const refreshToken = TokenStore.instance.getRefreshToken();

  if (refreshToken) {
    headers.set("Authorization", `Bearer ${refreshToken}`);
  }

  const response = (await fetch(request, {
    headers,
  })) as ClientResponse<"/api/auth", "put">;

  switch (response.status) {
    case 201: {
      const { accessToken, refreshToken, ...rest } = await response.json();
      TokenStore.instance.setTokens({ accessToken, refreshToken });
      return new Response(JSON.stringify(rest), response);
    }
    case 401: {
      TokenStore.instance.clear();
      return response;
    }
    default: {
      return response;
    }
  }
};
