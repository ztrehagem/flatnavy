import type { Result } from "../../utils/Result.js";
import { AuthenticationError } from "../error/AuthenticationError.js";
import type { AuthenticationToken } from "../model/Session/AuthenticationToken.js";
import type { IServerKeyRepository } from "../repository/Server/IServerKeyRepository.js";

export class HttpAuthenticationService {
  readonly #serverKeyRepository: IServerKeyRepository;

  constructor(serverKeyRepository: IServerKeyRepository) {
    this.#serverKeyRepository = serverKeyRepository;
  }

  async parseAuthenticationToken(
    authorizationHeader: string
  ): Promise<Result<AuthenticationToken, AuthenticationError>> {
    const [type = "", jwt = ""] = authorizationHeader.split(" ", 2) ?? [];

    if (type != "Bearer" || !jwt) {
      return [
        new AuthenticationError(
          HttpAuthenticationService,
          "invalid authorization header"
        ),
      ];
    }

    const serverKey = await this.#serverKeyRepository.get();
    const [eAccessToken, accessToken] = await serverKey.verifyToken(jwt);

    if (eAccessToken) {
      return [
        new AuthenticationError(
          HttpAuthenticationService,
          "unverified access token"
        ),
      ];
    }

    if (!accessToken.valid) {
      return [
        new AuthenticationError(
          HttpAuthenticationService,
          "invalid access token"
        ),
      ];
    }

    return [null, accessToken];
  }
}
