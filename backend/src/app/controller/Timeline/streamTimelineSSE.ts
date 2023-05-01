import type { Context } from "../../context.js";
import {
  TimelineScope,
  TimelineScopeKind,
} from "../../model/Timeline/TimelineScope.js";
import { serializeTimelineEntry } from "../../serializer/Timeline.js";
import { defineRoute } from "../defineController.js";
import { Type } from "@fastify/type-provider-typebox";
import { schema } from "../../schema.js";

export const streamTimelineSSE = defineRoute(
  ({ timelineRepository }: Context) => ({
    method: "GET",
    url: "/api/stream/sse/timeline",
    schema: {
      querystring: Type.Object({
        scope: Type.Ref(schema.TimelineScope),
      }),
    },
    handler: async (req, reply) => {
      reply.raw.writeHead(200, {
        ...reply.getHeaders(),
        "Content-Type": "text/event-stream",
      });

      const sendEvent = (obj: object) => {
        const message = JSON.stringify(obj);
        reply.raw.write(`data: ${message}\n\n`);
      };

      const heartbeatIntervalId = setInterval(() => sendEvent([]), 5000);

      const scope = TimelineScope.create({ kind: TimelineScopeKind.local });

      const subscription = await timelineRepository.subscribe(
        scope,
        (entries) => sendEvent(entries.map(serializeTimelineEntry))
      );

      req.socket.on("close", () => {
        subscription.unsubscribe();
        clearInterval(heartbeatIntervalId);
        reply.raw.end();
      });
    },
  })
);
