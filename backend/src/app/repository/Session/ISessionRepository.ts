import type { AccessToken } from "../../model/Session/AccessToken.js";
import type { RefreshToken } from "../../model/Session/RefreshToken.js";
import type { User } from "../../model/User/User.js";

export type CreateSessionParams = {
  user: User;
};

export interface ISessionRepository {
  createSession(
    params: CreateSessionParams
  ): Promise<[AccessToken, RefreshToken]>;
}
