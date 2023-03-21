import * as path from "node:path";
import { fastify } from "fastify";
import { default as fastifyStatic } from "@fastify/static";
import { router } from "./router.js";

const app = fastify();

app.register(router, {
  prefix: "/api/",
});

app.register(fastifyStatic, {
  root: path.resolve("../frontend/dist"),
});

export { app };
