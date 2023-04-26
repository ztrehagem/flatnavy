import type { RouteHandlerMethod } from "fastify";
import type { Context } from "../../context.js";
import {
  TimelineScope,
  TimelineScopeKind,
} from "../../model/Timeline/TimelineScope.js";
import { serializeTimelineEntry } from "../../serializer/Timeline.js";

export const streamTimelineSSE =
  ({ timelineRepository }: Context): RouteHandlerMethod =>
  async (req, reply) => {
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
      sendEvent([]);
    }, 5000);

    const subscription = await timelineRepository.subscribe(
      TimelineScope.create({ kind: TimelineScopeKind.local }),
      (entries) => {
        sendEvent(entries.map(serializeTimelineEntry));
      }
    );

    req.socket.on("close", () => {
      subscription.unsubscribe();
      clearInterval(heartbeatIntervalId);
      reply.raw.end();
    });
  };
