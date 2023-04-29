import type { ServerEnv } from "./model/Server/ServerEnv.js";
import type { IPostRepository } from "./repository/Post/IPostRepository.js";
import type { IServerKeyRepository } from "./repository/Server/IServerKeyRepository.js";
import type { ISessionRepository } from "./repository/Session/ISessionRepository.js";
import type { ITimelineRepository } from "./repository/Timeline/ITimelineRepository.js";
import type { IUserRepository } from "./repository/User/IUserRepository.js";
import type { HttpAuthenticationService } from "./service/HttpAuthenticationService.js";
import type { SessionService } from "./service/SessionService.js";

export interface Context {
  readonly serverEnv: ServerEnv;

  readonly serverKeyRepository: IServerKeyRepository;
  readonly sessionRepository: ISessionRepository;
  readonly userRepository: IUserRepository;
  readonly postRepository: IPostRepository;
  readonly timelineRepository: ITimelineRepository;

  readonly httpAuthenticationService: HttpAuthenticationService;
  readonly sessionService: SessionService;
}
