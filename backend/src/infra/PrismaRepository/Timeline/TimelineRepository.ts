import type * as prisma from "@prisma/client";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { commandOptions, type RedisClientType } from "redis";
import { TimelineSubscription } from "../../../app/model/Timeline/TimelineSubscription.js";
import type { ITimelineRepository } from "../../../app/repository/Timeline/ITimelineRepository.js";
import { TimelineEntry } from "../../../app/model/Timeline/TimelineEntry.js";
import { Post } from "../../../app/model/Post/Post.js";
import { User } from "../../../app/model/User/User.js";
import { UserId } from "../../../app/model/User/UserId.js";
import { UserHandle } from "../../../app/model/User/UserHandle.js";
import { UserName } from "../../../app/model/User/UserName.js";
import { PostId } from "../../../app/model/Post/PostId.js";
import { Temporal } from "@js-temporal/polyfill";
import type { TimelineListener } from "../../../app/model/Timeline/TimelineListener.js";
import type { TimelineScope } from "../../../app/model/Timeline/TimelineScope.js";

export class TimelineRepository implements ITimelineRepository {
  readonly #prisma: prisma.PrismaClient;
  readonly #redis: RedisClientType;

  constructor({ prisma, redis }: PrismaRepositoryContext) {
    this.#prisma = prisma;
    this.#redis = redis;
  }

  async publish(post: Post): Promise<void> {
    await this.#redis.xAdd(
      "timeline:local",
      "*",
      {
        id: post.postId.value.toString(),
        body: post.body,
        uid: post.user.id.value.toString(),
        handle: post.user.handle.value,
        name: post.user.name?.value ?? "",
        at: post.dateTime.toString(),
      },
      {
        TRIM: {
          strategy: "MAXLEN",
          strategyModifier: "~",
          threshold: 1000,
        },
      }
    );
  }

  subscribe(
    scope: TimelineScope,
    listener: TimelineListener
  ): TimelineSubscription {
    const abortController = new AbortController();

    const it = createTimelineIterator(
      this.#redis,
      scope,
      abortController.signal
    );

    void dispatchTimelineIterator(it, listener);

    return TimelineSubscription.create(abortController);
  }
}

async function* createTimelineIterator(
  redis: RedisClientType,
  scope: TimelineScope,
  signal: AbortSignal
) {
  const key = `timeline:${scope.toKey()}`;

  redis = redis.duplicate();
  await redis.connect();

  const streams = await redis.xRead({ key, id: "0" });
  const entries =
    streams?.at(0)?.messages.slice(-100).map(mapTimelineEntry) ?? [];
  yield entries;

  let lastId = entries.at(-1)?.id ?? "$";

  while (1) {
    const streams = await redis.xRead(
      commandOptions({ signal }),
      { key, id: lastId },
      { BLOCK: 0 }
    );
    const entries = streams?.at(0)?.messages.map(mapTimelineEntry) ?? [];
    yield entries;
    lastId = entries.at(-1)?.id ?? "$";
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
  } catch {
    // do nothing because the error is AbortError
  }
};

const mapTimelineEntry = ({
  id,
  message,
}: {
  id: string;
  message: Record<string, string>;
}) => {
  return TimelineEntry.create({
    id: id,
    post: Post.create({
      postId: PostId.create(Number(message.id)),
      body: message.body,
      user: User.create({
        id: UserId.create(Number(message.uid)),
        handle: UserHandle.create(message.handle)[1]!,
        name: UserName.create(message.name)[1]!,
      }),
      dateTime: Temporal.Instant.from(message.at),
    }),
  });
};
