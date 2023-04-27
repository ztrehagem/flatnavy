import type { TimelineEntry } from "../model/Timeline/TimelineEntry.js";
import { serializePost } from "./Post.js";

export const serializeTimelineEntry = (entry: TimelineEntry): object => {
  return {
    id: entry.id,
    post: serializePost(entry.post),
  };
};
