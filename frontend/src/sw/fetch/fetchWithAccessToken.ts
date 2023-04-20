import { TokenStore } from "../TokenStore.js";

export const fetchWithAccessToken = (request: Request): Promise<Response> => {
  const headers = new Headers(request.headers);

  headers.set(
    "Authorization",
    `Bearer ${TokenStore.instance.getAccessToken() ?? ""}`
  );

  return fetch(request, {
    headers,
  });
};
