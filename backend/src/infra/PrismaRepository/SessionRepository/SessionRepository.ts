import type * as prisma from "@prisma/client";
import { Temporal } from "@js-temporal/polyfill";
import type {
  CreateSessionParams,
  CreateSessionResult,
  ISessionRepository,
} from "../../../app/repository/Session/ISessionRepository.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { SessionId } from "../../../app/model/Session/SessionId.js";
import { AuthenticationToken } from "../../../app/model/Session/AuthenticationToken.js";

export class SessionRepository implements ISessionRepository {
  readonly #prisma: prisma.PrismaClient;

  constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }

  async createSession({
    user,
    issuer,
    audience,
    accessTokenTtl,
    refreshTokenTtl,
  }: CreateSessionParams): Promise<CreateSessionResult> {
    const now = Temporal.Now.instant();

    const accessToken = AuthenticationToken.accessToken({
      issuer,
      audience,
      userHandle: user.handle,
      sessionId: SessionId.generate(), // TODO: Rotation
      issuedAt: now,
      expiredAt: now.add(accessTokenTtl),
    });

    const refreshToken = AuthenticationToken.refreshToken({
      issuer,
      audience,
      userHandle: user.handle,
      sessionId: SessionId.generate(), // TODO: Rotation
      issuedAt: now,
      expiredAt: now.add(refreshTokenTtl),
    });

    await Promise.resolve();

    return { accessToken, refreshToken };
  }
}
