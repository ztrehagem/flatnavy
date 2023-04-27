import type { TimelineScope } from "../../../app/model/Timeline/TimelineScope.js";
import { Stream } from "./Stream.js";
import type { StreamRecord } from "./StreamRecord.js";

export class StreamWriter extends Stream {
  async write(record: StreamRecord, scope: TimelineScope): Promise<void> {
    const key = this.scopeToKey(scope);

    await this.redis.xAdd(key, "*", record, {
      TRIM: {
        strategy: "MAXLEN",
        strategyModifier: "~",
        threshold: 1000,
      },
    });
  }
}
