import type { FastifyPluginAsync } from "fastify";
import type { Context } from "./app/context.js";
import { createPost } from "./app/controller/Post/createPost.js";
import { createUser } from "./app/controller/User/createUser.js";
import { indexUser } from "./app/controller/User/indexUser.js";
import { getUser } from "./app/controller/User/getUser.js";
import { createSession } from "./app/controller/Session/createSession.js";
import { getSession } from "./app/controller/Session/getSession.js";
import { deleteSession } from "./app/controller/Session/deleteSession.js";
import { streamTimelineSSE } from "./app/controller/Timeline/streamTimelineSSE.js";

export type RouterOptions = {
  context: Context;
};

export const router: FastifyPluginAsync<RouterOptions> = (app, { context }) => {
  app.get("/api/auth", getSession(context));
  app.post("/api/auth", createSession(context));
  app.delete("/api/auth", deleteSession(context));
  app.get("/api/users", indexUser(context));
  app.post("/api/users", createUser(context));
  app.get("/api/users/:userHandle", getUser(context));
  app.post("/api/posts", createPost(context));
  app.get("/api/stream/sse/timeline", streamTimelineSSE(context));

  return Promise.resolve();
};
