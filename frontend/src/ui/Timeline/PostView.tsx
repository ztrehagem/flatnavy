import React from "react";
import type { schemas } from "@flatnavy/api";
import * as css from "./PostView.css.js";
import { useRelativeTimeText } from "../../lib/DateTime/useRelativeTimeText.js";
import { Temporal } from "@js-temporal/polyfill";

export type Props = {
  post: schemas["Post"];
};

export const PostView: React.FC<Props> = ({ post }) => {
  const dateTime = Temporal.Instant.from(post.dateTime);
  const relativeTimeText = useRelativeTimeText(dateTime);

  return (
    <article className={css.root}>
      <div className={css.header}>
        <div className={css.name}>{post.user.name}</div>
        <div className={css.handle}>@{post.user.handle}</div>
        <time dateTime={post.dateTime} className={css.time}>
          {relativeTimeText}
        </time>
      </div>

      <p className={css.body}>{post.body}</p>
    </article>
  );
};
