import * as path from "node:path";
import { fastify } from "fastify";
import { default as fastifyStatic } from "@fastify/static";

const app = fastify();

app.get("/api/", (req, reply) => {
  reply.send({ hello: "world" });
});

app.register(fastifyStatic, {
  root: path.resolve("../frontend/dist"),
});

export { app };
