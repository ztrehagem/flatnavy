import { commandOptions, type RedisClientType } from "redis";
import type { TimelineScope } from "../../../app/model/Timeline/TimelineScope.js";
import { Stream } from "./Stream.js";
import { parseStreamMessage, type StreamEntry } from "./StreamEntry.js";

export class StreamReader extends Stream {
  #lastId = "0";

  static async create(redis: RedisClientType): Promise<StreamReader> {
    redis = redis.duplicate();
    await redis.connect();
    return new StreamReader(redis);
  }

  private constructor(redis: RedisClientType) {
    super(redis);
  }

  async read(scope: TimelineScope): Promise<StreamEntry[]> {
    const key = this.scopeToKey(scope);

    const streams = await this.redis.xRead({ key, id: this.#lastId });

    const rawEntries =
      streams
        ?.at(0)
        ?.messages.slice(-StreamReader.PAGE_SIZE)
        .map(parseStreamMessage) ?? [];

    this.#lastId = rawEntries.at(-1)?.id ?? "$";

    return rawEntries;
  }

  async listen(
    scope: TimelineScope,
    signal: AbortSignal
  ): Promise<StreamEntry[]> {
    const key = this.scopeToKey(scope);

    const streams = await this.redis.xRead(
      commandOptions({ signal }),
      { key, id: this.#lastId },
      { BLOCK: 0 }
    );

    const rawEntries = streams?.at(0)?.messages.map(parseStreamMessage) ?? [];

    this.#lastId = rawEntries.at(-1)?.id ?? "$";

    return rawEntries;
  }
}
