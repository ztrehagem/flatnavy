import { PrismaClient } from "@prisma/client";
import type { PrismaRepositoryContext } from "./infra/PrismaRepository/PrismaRepositoryContext.js";
import type { Context } from "./app/context.js";
import { UserRepository } from "./infra/PrismaRepository/User/UserRepository.js";
import { ServerKeyRepository } from "./infra/PrismaRepository/Server/ServerKeyRepository.js";
import { SessionRepository } from "./infra/PrismaRepository/SessionRepository/SessionRepository.js";
import { HttpAuthenticationService } from "./app/service/HttpAuthenticationService.js";
import { Env } from "./app/model/Server/Env.js";
import { SessionService } from "./app/service/SessionService.js";

export const createContext = async (): Promise<Context> => {
  const [eEnv, env] = Env({
    domain: process.env.SERVER_DOMAIN ?? "flatnavy.example",
  });

  if (eEnv) throw eEnv;

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
  const sessionService = new SessionService({ env, sessionRepository });

  return {
    env,
    serverKeyRepository,
    sessionRepository,
    userRepository,
    httpAuthenticationService,
    sessionService,
  };
};
