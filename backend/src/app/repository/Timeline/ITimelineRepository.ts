import type { TimelineListener } from "../../model/Timeline/TimelineListener.js";
import type { TimelineScope } from "../../model/Timeline/TimelineScope.js";
import type { TimelineSubscription } from "../../model/Timeline/TimelineSubscription.js";

export type SubscribeParams = {
  scope: TimelineScope;
  listener: TimelineListener;
};

export interface ITimelineRepository {
  subscribe(params: SubscribeParams): Promise<TimelineSubscription>;
}
