declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  // eslint-disable-next-line no-console
  console.log(event);
});
