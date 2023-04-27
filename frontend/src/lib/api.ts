import type { ApiClientContext } from "@flatnavy/api/client";

export const apiOrigin = import.meta.env.DEV
  ? "http://localhost:3000"
  : location.origin;

export const apiClientContext: ApiClientContext = {
  origin: apiOrigin,
  init: {
    cache: "no-store",
    credentials: "include",
    mode: "cors",
  },
};
