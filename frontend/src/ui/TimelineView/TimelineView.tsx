import React, { useState } from "react";
import * as css from "./TimelineView.css.js";
import type { schemas } from "@flatnavy/api";
import { apiOrigin } from "../../lib/api.js";

export const TimelineView: React.FC = () => {
  const [entries, setEntries] = useState<
    { id: string; post: schemas["Post"] }[]
  >([]);

  useState(() => {
    const source = new EventSource(
      new URL("/api/stream/sse/timeline", apiOrigin)
    );
    source.addEventListener("message", (event: MessageEvent<string>) => {
      const entries = JSON.parse(event.data) as Array<{
        id: string;
        post: schemas["Post"];
      }>;
      setEntries((prev) => [...prev, ...entries]);
    });
  });

  return (
    <ul className={css.list}>
      {entries.map(({ id, post }) => (
        <li key={id}>
          <div>
            {post.user.name} @{post.user.handle}
          </div>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};
