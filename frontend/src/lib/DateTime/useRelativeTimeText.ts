import type { Temporal } from "@js-temporal/polyfill";
import { Intl } from "@js-temporal/polyfill";
import { useNow } from "./useNow.js";

const formatter = new Intl.DateTimeFormat([], {
  dateStyle: "medium",
});

export const useRelativeTimeText = (time: Temporal.Instant): string => {
  const now = useNow();
  const duration = time.until(now, { largestUnit: "hours" });

  if (duration.hours >= 720) {
    return formatter.format(time);
  }

  if (duration.hours >= 24) {
    return `${Math.floor(duration.hours / 24)}d`;
  }

  if (duration.hours >= 1) {
    return `${duration.hours}h`;
  }

  if (duration.minutes >= 1) {
    return `${duration.minutes}m`;
  }

  if (duration.seconds >= 0) {
    return `${duration.seconds}s`;
  }

  return "now";
};
