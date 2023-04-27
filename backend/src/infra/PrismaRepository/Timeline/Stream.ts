import type { RedisClientType } from "redis";
import type { TimelineScope } from "../../../app/model/Timeline/TimelineScope.js";

export abstract class Stream {
  protected readonly redis: RedisClientType;

  static readonly PAGE_SIZE = 30;

  constructor(redis: RedisClientType) {
    this.redis = redis;
  }

  protected scopeToKey(scope: TimelineScope): string {
    return `timeline:${scope.toKey()}`;
  }
}
