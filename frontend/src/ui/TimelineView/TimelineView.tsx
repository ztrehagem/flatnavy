import type { schemas } from "@flatnavy/api";
import React, { useEffect, useState } from "react";
import { apiOrigin } from "../../lib/api.js";
import * as css from "./TimelineView.css.js";

export const TimelineView: React.FC = () => {
  const [entries, setEntries] = useState<Array<schemas["TimelineEntry"]>>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      new URL("/api/stream/sse/timeline?scope=local", apiOrigin)
    );

    eventSource.addEventListener("message", (event: MessageEvent<string>) => {
      const entries = JSON.parse(event.data) as Array<schemas["TimelineEntry"]>;
      setEntries((prev) => [...entries.reverse(), ...prev].slice(0, 100));
    });

    return () => {
      eventSource.close();
      setEntries([]);
    };
  }, []);

  return (
    <ul className={css.list}>
      {entries.map(({ id, post }) => (
        <li key={id}>
          <div>
            {post.user.name} @{post.user.handle}
          </div>
          <p>{post.body}</p>
          <time dateTime={post.dateTime}>{post.dateTime}</time>
        </li>
      ))}
    </ul>
  );
};
