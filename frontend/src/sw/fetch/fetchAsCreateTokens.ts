import type { ClientResponse } from "@flatnavy/api/client";
import { TokenStore } from "../TokenStore.js";

export const fetchAsCreateTokens = async (
  request: Request
): Promise<Response> => {
  const response = (await fetch(request)) as
    | ClientResponse<"/api/users", "post">
    | ClientResponse<"/api/auth", "post">
    | ClientResponse<"/api/auth", "put">;

  switch (response.status) {
    case 201: {
      const { accessToken, refreshToken, ...rest } = await response.json();
      TokenStore.instance.setTokens({ accessToken, refreshToken });
      return new Response(JSON.stringify(rest), response);
    }
    default: {
      return response;
    }
  }
};
