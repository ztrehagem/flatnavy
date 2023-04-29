import { Temporal } from "@js-temporal/polyfill";
import type { ServerEnv } from "../model/Server/ServerEnv.js";
import type { AuthenticationToken } from "../model/Session/AuthenticationToken.js";
import type { User } from "../model/User/User.js";
import type { ISessionRepository } from "../repository/Session/ISessionRepository.js";

export type Params = {
  serverEnv: ServerEnv;
  sessionRepository: ISessionRepository;
};

export class SessionService {
  readonly #serverEnv: ServerEnv;
  readonly #sessionRepository: ISessionRepository;

  constructor({ serverEnv, sessionRepository }: Params) {
    this.#serverEnv = serverEnv;
    this.#sessionRepository = sessionRepository;
  }

  async createSession({ user }: { user: User }): Promise<{
    accessToken: AuthenticationToken;
    refreshToken: AuthenticationToken;
  }> {
    return await this.#sessionRepository.createSession({
      user,
      issuer: this.#serverEnv.tokenIssuer,
      audience: [this.#serverEnv.tokenAudienceWeb],
      accessTokenTtl: Temporal.Duration.from(this.#serverEnv.accessTokenTtl),
      refreshTokenTtl: Temporal.Duration.from(this.#serverEnv.refreshTokenTtl),
    });
  }
}
