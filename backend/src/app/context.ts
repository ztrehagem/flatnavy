import type { IServerKeyRepository } from "./repository/ServerKey/IServerKeyRepository.js";
import type { ISessionRepository } from "./repository/Session/ISessionRepository.js";
import type { IUserRepository } from "./repository/User/IUserRepository.js";

export interface Context {
  readonly serverKeyRepository: IServerKeyRepository;
  readonly sessionRepository: ISessionRepository;
  readonly userRepository: IUserRepository;
}
