import { getSession } from "@flatnavy/api/client";
import { atom } from "jotai";
import { apiClientContext } from "../../lib/api.js";
import { User } from "../User/User.type.js";
import { Session } from "./Session.type.js";

export const sessionState = atom<Session | null | Promise<Session | null>>(
  (async () => {
    const [error, result] = await getSession(apiClientContext)();

    if (error) return null;

    const user = User(result);

    return Session({ user });
  })()
);
