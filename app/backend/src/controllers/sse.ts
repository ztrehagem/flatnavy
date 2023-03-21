import { RouteHandlerMethod } from "fastify";
import { PostStore } from "../store/PostStore.js";

export const sse = (): RouteHandlerMethod => (req, reply) => {
  reply.raw.writeHead(200, {
    ...reply.getHeaders(),
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-store",
  });

  const sendEvent = (message: string) => {
    reply.raw.write(`data: ${message}\n\n`);
  };

  const listener = (post: string) => {
    const message = JSON.stringify({ post });
    sendEvent(message);
  };

  PostStore.global.on("post", listener);

  req.socket.on("close", () => {
    PostStore.global.off("post", listener);
    reply.raw.end();
  });
};
