import { PrismaClient } from "@prisma/client";
import { createServer } from "./server.js";
import type { PrismaRepositoryContext } from "./infra/PrismaRepository/PrismaRepositoryContext.js";
import type { Context } from "./app/context.js";
import { UserRepository } from "./infra/PrismaRepository/User/UserRepository.js";
import { ServerKeyRepository } from "./infra/PrismaRepository/ServerKey/ServerKeyRepository.js";

const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);

const prisma = new PrismaClient();
await prisma.$connect();

const repoCtx: PrismaRepositoryContext = {
  prisma,
};

const context: Context = {
  serverKeyRepository: await ServerKeyRepository.create(repoCtx),
  userRepository: new UserRepository(repoCtx),
};

const server = await createServer({ context });

server.listen({ host, port }, (error, address) => {
  if (error) {
    throw error;
  }

  // eslint-disable-next-line no-console
  console.log(`Server is now listening on ${address}`);
});
