import * as path from "node:path";
import { fastify } from "fastify";
import { default as fastifyStatic } from "@fastify/static";
import { router } from "./router.js";
import type { Context } from "./context.js";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./infra/PrismaRepository/User/UserRepository.js";
import type { PrismaRepositoryContext } from "./infra/PrismaRepository/PrismaRepositoryContext.js";

const prismaRepositoryContext: PrismaRepositoryContext = {
  prisma: new PrismaClient(),
};

const context: Context = {
  userRepository: new UserRepository(prismaRepositoryContext),
};

const server = fastify();

await server.register(router, { context });

await server.register(fastifyStatic, {
  root: path.resolve("../frontend/dist"),
});

server.addHook("onRequest", async (req, reply) => {
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
});

export { server };
