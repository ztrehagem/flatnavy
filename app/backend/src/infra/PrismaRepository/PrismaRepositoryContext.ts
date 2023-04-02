import { PrismaClient } from "@prisma/client";

export type PrismaRepositoryContext = {
  readonly prisma: PrismaClient;
};
