import type { IServerKeyRepository } from "./repository/Server/IServerKeyRepository.js";
import type { ISessionRepository } from "./repository/Session/ISessionRepository.js";
import type { IUserRepository } from "./repository/User/IUserRepository.js";
import type { HttpAuthenticationService } from "./service/HttpAuthenticationService.js";

export interface Context {
  readonly serverKeyRepository: IServerKeyRepository;
  readonly sessionRepository: ISessionRepository;
  readonly userRepository: IUserRepository;

  readonly httpAuthenticationService: HttpAuthenticationService;
}
