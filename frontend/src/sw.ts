import { logInfo } from "./lib/log.js";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (e) => {
  logInfo("ServiceWorker installing");
  e.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (e) => {
  logInfo("ServiceWorker activating");
  e.waitUntil(self.clients.claim());
});
