import { z } from "zod";
import type { Context } from "../../context.js";
import {
  TimelineScope,
  TimelineScopeKind,
} from "../../model/Timeline/TimelineScope.js";
import { serializeTimelineEntry } from "../../serializer/Timeline.js";
import { defineController } from "../defineController.js";

export const streamTimelineSSE = defineController(
  ({ timelineRepository }: Context) => ({
    method: "get",
    path: "/api/stream/sse/timeline",
    validate: ({ queryParams }) => ({
      queryParams: z
        .object({
          scope: z.enum(["local"]),
        })
        .parse(queryParams),
    }),
    handler: async ({ queryParams }, req, res) => {
      res.writeHead(200, {
        ...res.getHeaders(),
        "Content-Type": "text/event-stream",
      });

      const sendEvent = (obj: object) => {
        const message = JSON.stringify(obj);
        res.write(`data: ${message}\n\n`);
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
        res.end();
      });
    },
  })
);
