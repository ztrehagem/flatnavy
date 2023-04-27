import type { Post } from "../../model/Post/Post.js";
import type { TimelineListener } from "../../model/Timeline/TimelineListener.js";
import type { TimelineScope } from "../../model/Timeline/TimelineScope.js";
import type { TimelineSubscription } from "../../model/Timeline/TimelineSubscription.js";

export interface ITimelineRepository {
  publish(post: Post): void | Promise<void>;
  subscribe(
    scope: TimelineScope,
    listener: TimelineListener
  ): TimelineSubscription | Promise<TimelineSubscription>;
}
