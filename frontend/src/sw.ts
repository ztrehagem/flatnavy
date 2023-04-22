import { logInfo } from "./lib/log.js";
import { RequestType, detectRequestType } from "./sw/RequestType.js";
import { fetchAsCreateTokens } from "./sw/fetch/fetchAsCreateTokens.js";
import { fetchAsRefreshTokens } from "./sw/fetch/fetchAsRefreshTokens.js";
import { fetchAsRevokeTokens } from "./sw/fetch/fetchAsRevokeTokens.js";
import { fetchWithAccessToken } from "./sw/fetch/fetchWithAccessToken.js";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", () => {
  logInfo("ServiceWorker installing");
  void self.skipWaiting();
});

self.addEventListener("activate", () => {
  logInfo("ServiceWorker activated");
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  const requestType = detectRequestType(request);

  switch (requestType) {
    case RequestType.createSession: {
      event.respondWith(fetchAsCreateTokens(request));
      return;
    }
    case RequestType.refreshSession: {
      event.respondWith(fetchAsRefreshTokens(request));
      return;
    }
    case RequestType.revokeSession: {
      event.respondWith(fetchAsRevokeTokens(request));
      return;
    }
    case RequestType.useSession: {
      event.respondWith(fetchWithAccessToken(request));
      return;
    }
    case RequestType.bypass: {
      event.respondWith(fetch(request));
      return;
    }
    default: {
      const _: never = requestType;
      return;
    }
  }
});
