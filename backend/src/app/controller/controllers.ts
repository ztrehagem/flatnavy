import type { Context } from "../context.js";
import { createPost } from "./Post/createPost.js";
import { createSession } from "./Session/createSession.js";
import { deleteSession } from "./Session/deleteSession.js";
import { getSession } from "./Session/getSession.js";
import { streamTimelineSSE } from "./Timeline/streamTimelineSSE.js";
import { createUser } from "./User/createUser.js";
import { getUser } from "./User/getUser.js";
import { indexUser } from "./User/indexUser.js";
import type { AbstractController } from "./types.js";

export const instantiateControllers = (
  context: Context
): AbstractController[] => {
  return [
    getSession(context),
    createSession(context),
    deleteSession(context),
    indexUser(context),
    createUser(context),
    getUser(context),
    createPost(context),
    streamTimelineSSE(context),
  ];
};
