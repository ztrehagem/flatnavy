import type { ServerKey } from "../../model/ServerKey/ServerKey.js";
import type { AccessToken } from "../../model/Session/AccessToken.js";
import type { RefreshToken } from "../../model/Session/RefreshToken.js";
import type { User } from "../../model/User/User.js"

export type CreateSessionParams = {
  serverKey: ServerKey;
  user: User;
}

export interface ISessionRepository {
  createSession(params: CreateSessionParams): Promise<[AccessToken, RefreshToken]>;
}
