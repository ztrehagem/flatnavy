import type * as prisma from "@prisma/client";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { AbortError, type RedisClientType } from "redis";
import { TimelineSubscription } from "../../../app/model/Timeline/TimelineSubscription.js";
import type { ITimelineRepository } from "../../../app/repository/Timeline/ITimelineRepository.js";
import { TimelineEntry } from "../../../app/model/Timeline/TimelineEntry.js";
import type { Post } from "../../../app/model/Post/Post.js";
import type { TimelineListener } from "../../../app/model/Timeline/TimelineListener.js";
import {
  TimelineScope,
  TimelineScopeKind,
} from "../../../app/model/Timeline/TimelineScope.js";
import { mapPost } from "../../../app/mapper/Post.js";
import { logError, logInfo } from "../../../utils/log.js";
import { serializePost } from "./StreamRecord.js";
import { StreamWriter } from "./StreamWriter.js";
import { StreamReader } from "./StreamReader.js";
import type { StreamEntry } from "./StreamEntry.js";

export class TimelineRepository implements ITimelineRepository {
  readonly #prisma: prisma.PrismaClient;
  readonly #redis: RedisClientType;

  constructor({ prisma, redis }: PrismaRepositoryContext) {
    this.#prisma = prisma;
    this.#redis = redis;
  }

  async publish(post: Post): Promise<void> {
    const scope = TimelineScope.create({ kind: TimelineScopeKind.local });

    const record = serializePost(post);

    const stream = new StreamWriter(this.#redis);

    await stream.write(record, scope);
  }

  subscribe(
    scope: TimelineScope,
    listener: TimelineListener
  ): TimelineSubscription {
    const abortController = new AbortController();

    const it = this.#createTimelineIterator(scope, abortController.signal);

    void dispatchTimelineIterator(it, listener);

    return TimelineSubscription.create(abortController);
  }

  async *#createTimelineIterator(
    scope: TimelineScope,
    signal: AbortSignal
  ): AsyncGenerator<TimelineEntry[]> {
    const stream = await StreamReader.create(this.#redis);

    const rawEntries = await stream.read(scope);
    yield this.#fetchTimelineEntries(rawEntries);

    while (1) {
      const rawEntries = await stream.listen(scope, signal);
      yield this.#fetchTimelineEntries(rawEntries);
    }
  }

  async #fetchTimelineEntries(
    rawEntries: readonly StreamEntry[]
  ): Promise<TimelineEntry[]> {
    const records = await this.#prisma.post.findMany({
      where: {
        id: {
          in: rawEntries.map(({ postId }) => postId),
        },
      },
      select: {
        id: true,
        body: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            handle: true,
            name: true,
          },
        },
      },
    });

    return rawEntries.flatMap(({ id, postId }) => {
      const record = records.find((record) => record.id == postId);
      if (!record) return [];
      return TimelineEntry.create({ id, post: mapPost(record) });
    });
  }
}

const dispatchTimelineIterator = async (
  it: AsyncGenerator<readonly TimelineEntry[]>,
  listener: TimelineListener
) => {
  try {
    for await (const entries of it) {
      await listener(entries);
    }
  } catch (error) {
    if (error instanceof AbortError) {
      logInfo("streaming connection is aborted");
    } else {
      logError(error);
    }
  }
};
