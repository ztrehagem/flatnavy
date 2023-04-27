import type { TimelineEntry } from "./TimelineEntry.js";

export type TimelineListener = (
  entries: readonly TimelineEntry[]
) => void | Promise<void>;
