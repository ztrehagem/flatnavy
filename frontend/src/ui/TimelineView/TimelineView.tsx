import type { schemas } from "@flatnavy/api";
import { TimelineStream } from "@flatnavy/api/client";
import React, { useEffect, useState } from "react";
import { apiClientContext } from "../../lib/api.js";
import * as css from "./TimelineView.css.js";

export const TimelineView: React.FC = () => {
  const [entries, setEntries] = useState<Array<schemas["TimelineEntry"]>>([]);

  useEffect(() => {
    const stream = new TimelineStream(apiClientContext, {
      scope: "local",
      listener: (entries) => {
        const reversed = [...entries].reverse();
        setEntries((prev) => [...reversed, ...prev].slice(0, 100));
      },
    });

    return () => {
      stream.close();
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
