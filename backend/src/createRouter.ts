import type { FastifyPluginAsync, RouteOptions } from "fastify";
import type { Context } from "./app/context.js";
import { createPostTyped } from "./app/controller/Post/createPost.js";
import { createSession } from "./app/controller/Session/createSession.js";
import { deleteSession } from "./app/controller/Session/deleteSession.js";
import { getSession } from "./app/controller/Session/getSession.js";
import { streamTimelineSSE } from "./app/controller/Timeline/streamTimelineSSE.js";
import { createUser } from "./app/controller/User/createUser.js";
import { getUser } from "./app/controller/User/getUser.js";
import { indexUser } from "./app/controller/User/indexUser.js";

const routes = [
  getSession,
  createSession,
  deleteSession,
  indexUser,
  createUser,
  getUser,
  createPostTyped,
  streamTimelineSSE,
];

export const createRouter =
  (context: Context): FastifyPluginAsync =>
  (app) => {
    for (const route of routes) {
      app.route(route(context) as RouteOptions);
    }

    return Promise.resolve();
  };
