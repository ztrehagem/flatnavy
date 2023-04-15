import type { RouteHandlerMethod } from "fastify";
import { PostStore } from "../store/PostStore.js";

export const sse = (): RouteHandlerMethod => (req, reply) => {
  reply.raw.writeHead(200, {
    ...reply.getHeaders(),
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-store",
  });

  const sendEvent = (obj: object) => {
    const message = JSON.stringify(obj);
    reply.raw.write(`data: ${message}\n\n`);
  };

  const heartbeatIntervalId = setInterval(() => {
    sendEvent({});
  }, 5000);

  const onPost = (post: string) => {
    sendEvent({ type: "post", post });
  };

  PostStore.global.on("post", onPost);

  req.socket.on("close", () => {
    PostStore.global.off("post", onPost);
    clearInterval(heartbeatIntervalId);
    reply.raw.end();
  });
};
