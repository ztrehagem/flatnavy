export type ApiClientContext = {
  readonly origin: URL | string;
  readonly init?: RequestInit;
};
