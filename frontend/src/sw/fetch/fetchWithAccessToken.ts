import { TokenStore } from "../TokenStore.js";

export const fetchWithAccessToken = (request: Request): Promise<Response> => {
  const headers = new Headers(request.headers);

  const accessToken = TokenStore.instance.getAccessToken();

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(request, {
    headers,
  });
};
