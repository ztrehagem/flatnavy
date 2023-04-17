import type * as prisma from "@prisma/client";
import type {
  CreateSessionParams,
  ISessionRepository,
} from "../../../app/repository/Session/ISessionRepository.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { AccessToken } from "../../../app/model/Session/AccessToken.js";
import { RefreshToken } from "../../../app/model/Session/RefreshToken.js";
import { SessionId } from "../../../app/model/Session/SessionId.js";
import { Temporal } from "@js-temporal/polyfill";
import { Scope } from "../../../app/model/Session/Scope.js";

const ISSUER = "flatnavy.local";
const AUDIENCE = "flatnavy.local";

export class SessionRepository implements ISessionRepository {
  readonly #prisma: prisma.PrismaClient;

  constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }

  async createSession({
    user,
  }: CreateSessionParams): Promise<[AccessToken, RefreshToken]> {
    const now = Temporal.Now.instant();

    const accessToken = AccessToken({
      issuer: ISSUER,
      audience: [AUDIENCE],
      userHandle: user.handle,
      sessionId: SessionId("1"),
      scopes: [],
      issuedAt: now,
      expiredAt: now.add({ minutes: 1 }),
    });

    const [, refreshToken] = RefreshToken({
      issuer: ISSUER,
      audience: [AUDIENCE],
      userHandle: user.handle,
      sessionId: SessionId("1"),
      scopes: [Scope.refresh],
      issuedAt: now,
      expiredAt: now.add({ minutes: 10 }),
    });

    await Promise.resolve();

    return [accessToken, refreshToken!];
  }
}
