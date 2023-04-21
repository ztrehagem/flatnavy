import { PrismaClient } from "@prisma/client";
import type { PrismaRepositoryContext } from "./infra/PrismaRepository/PrismaRepositoryContext.js";
import type { Context } from "./app/context.js";
import { UserRepository } from "./infra/PrismaRepository/User/UserRepository.js";
import { ServerKeyRepository } from "./infra/PrismaRepository/ServerKey/ServerKeyRepository.js";
import { SessionRepository } from "./infra/PrismaRepository/SessionRepository/SessionRepository.js";
import { HttpAuthenticationService } from "./app/service/HttpAuthenticationService.js";

export const createContext = async (): Promise<Context> => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const repoCtx: PrismaRepositoryContext = {
    prisma,
  };

  const serverKeyRepository = new ServerKeyRepository(repoCtx);
  const sessionRepository = new SessionRepository(repoCtx);
  const userRepository = new UserRepository(repoCtx);

  const httpAuthenticationService = new HttpAuthenticationService(
    serverKeyRepository
  );

  return {
    serverKeyRepository,
    sessionRepository,
    userRepository,
    httpAuthenticationService,
  };
};
