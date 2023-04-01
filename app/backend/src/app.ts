import * as path from "node:path";
import { fastify } from "fastify";
import { default as fastifyStatic } from "@fastify/static";
import { router } from "./router.js";

const app = fastify();

await app.register(router, {
  prefix: "/api/",
});

await app.register(fastifyStatic, {
  root: path.resolve("../frontend/dist"),
});

export { app };
