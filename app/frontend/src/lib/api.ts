import { Client } from "@flatnavy/lib-api/client";

export const apiOrigin = import.meta.env.DEV
  ? "http://localhost:3000"
  : window.location.origin;

export const api = new Client({ origin: apiOrigin });
