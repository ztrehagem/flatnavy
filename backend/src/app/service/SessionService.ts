import { Temporal } from "@js-temporal/polyfill";
import type { Env } from "../model/Server/Env.js";
import type { AuthenticationToken } from "../model/Session/AuthenticationToken.js";
import type { User } from "../model/User/User.js";
import type { ISessionRepository } from "../repository/Session/ISessionRepository.js";

export type Params = {
  env: Env;
  sessionRepository: ISessionRepository;
};

export class SessionService {
  readonly #env: Env;
  readonly #sessionRepository: ISessionRepository;

  constructor({ env, sessionRepository }: Params) {
    this.#env = env;
    this.#sessionRepository = sessionRepository;
  }

  async createSession({ user }: { user: User }): Promise<{
    accessToken: AuthenticationToken;
    refreshToken: AuthenticationToken;
  }> {
    return await this.#sessionRepository.createSession({
      user,
      issuer: this.#env.domain,
      audience: [this.#env.domain],
      accessTokenTtl: Temporal.Duration.from(
        process.env.NODE_ENV == "production" ? { hours: 1 } : { minutes: 30 }
      ),
      refreshTokenTtl: Temporal.Duration.from(
        process.env.NODE_ENV == "production" ? { hours: 72 } : { minutes: 5 }
      ),
    });
  }
}
