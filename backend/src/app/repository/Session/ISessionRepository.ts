import type { Temporal } from "@js-temporal/polyfill";
import type { AuthenticationToken } from "../../model/Session/AuthenticationToken.js";
import type { User } from "../../model/User/User.js";

export type CreateSessionParams = {
  readonly user: User;
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly accessTokenTtl: Temporal.Duration;
  readonly refreshTokenTtl: Temporal.Duration;
};

export type CreateSessionResult = {
  accessToken: AuthenticationToken;
  refreshToken: AuthenticationToken;
};

export interface ISessionRepository {
  createSession(params: CreateSessionParams): Promise<CreateSessionResult>;
}
