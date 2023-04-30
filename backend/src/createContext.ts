import { PrismaClient } from "@prisma/client";
import { createClient as createRedisClient, type RedisClientType } from "redis";
import type { Context } from "./app/context.js";
import { ServerEnv } from "./app/model/Server/ServerEnv.js";
import { HttpAuthenticationService } from "./app/service/HttpAuthenticationService.js";
import { SessionService } from "./app/service/SessionService.js";
import { PostRepository } from "./infra/PrismaRepository/Post/PostRepository.js";
import type { PrismaRepositoryContext } from "./infra/PrismaRepository/PrismaRepositoryContext.js";
import { ServerKeyRepository } from "./infra/PrismaRepository/Server/ServerKeyRepository.js";
import { SessionRepository } from "./infra/PrismaRepository/SessionRepository/SessionRepository.js";
import { TimelineRepository } from "./infra/PrismaRepository/Timeline/TimelineRepository.js";
import { UserRepository } from "./infra/PrismaRepository/User/UserRepository.js";
import { ProcessEnv } from "./ProcessEnv.js";

export const createContext = async (): Promise<Context> => {
  const [eServerEnv, serverEnv] = ServerEnv.create({
    domain: ProcessEnv.current.serverDomain,
    accessTokenTtl: ProcessEnv.current.serverAccessTokenTtl,
    refreshTokenTtl: ProcessEnv.current.serverRefreshTokenTtl,
  });

  if (eServerEnv) throw eServerEnv;

  const prisma = new PrismaClient();

  const redis: RedisClientType = createRedisClient({
    url: ProcessEnv.current.redisUrl,
  });

  await Promise.all([prisma.$connect(), redis.connect()]);

  const repoCtx: PrismaRepositoryContext = {
    prisma,
    redis,
  };

  const serverKeyRepository = new ServerKeyRepository(repoCtx);
  const sessionRepository = new SessionRepository(repoCtx);
  const userRepository = new UserRepository(repoCtx);
  const postRepository = new PostRepository(repoCtx);
  const timelineRepository = new TimelineRepository(repoCtx);

  const httpAuthenticationService = new HttpAuthenticationService(
    serverKeyRepository
  );
  const sessionService = new SessionService({
    serverEnv: serverEnv,
    sessionRepository,
  });

  return {
    serverEnv,
    serverKeyRepository,
    sessionRepository,
    userRepository,
    postRepository,
    timelineRepository,
    httpAuthenticationService,
    sessionService,
  };
};
