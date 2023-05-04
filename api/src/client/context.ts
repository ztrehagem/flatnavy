import type { ITokenStore } from "./store/TokenStore.js";

export type ApiClientContext = {
  readonly origin: URL | string;
  readonly init?: RequestInit;
  readonly tokenStore?: ITokenStore;
};
