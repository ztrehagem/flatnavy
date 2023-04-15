import type { ApiClientContext } from "@flatnavy/lib-api/client";

export const apiOrigin = import.meta.env.DEV
  ? "http://localhost:3000"
  : window.location.origin;

export const apiClientContext: ApiClientContext = {
  origin: apiOrigin,
};
