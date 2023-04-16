import type { IServerKeyRepository } from "./repository/ServerKey/IServerKeyRepository.js";
import type { IUserRepository } from "./repository/User/IUserRepository.js";

export interface Context {
  readonly serverKeyRepository: IServerKeyRepository;
  readonly userRepository: IUserRepository;
}
