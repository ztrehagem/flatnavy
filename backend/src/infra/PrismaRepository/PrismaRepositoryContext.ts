import type { PrismaClient } from "@prisma/client";
import type { RedisClientType } from "redis";

export type PrismaRepositoryContext = {
  readonly prisma: PrismaClient;
  readonly redis: RedisClientType;
};
