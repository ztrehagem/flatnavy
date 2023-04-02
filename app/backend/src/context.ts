import { IUserRepository } from "./app/repository/User/IUserRepository.js";

export interface Context {
  readonly userRepository: IUserRepository;
}
