import { Temporal } from "@js-temporal/polyfill";
import type { Brand } from "../../../utils/Brand.js";
import type { UserHandle } from "../User/UserHandle.js";
import type { SessionId } from "./SessionId.js";
import { Scope } from "./Scope.js";

declare const brand: unique symbol;

type IAuthenticationToken = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
  get valid(): boolean;
};

export type AuthenticationToken = Brand<IAuthenticationToken, typeof brand>;

export type Params = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
};

export const AuthenticationToken = ({
  issuer,
  audience,
  userHandle,
  sessionId,
  scopes,
  issuedAt,
  expiredAt,
}: Params): AuthenticationToken => {
  return {
    issuer,
    audience,
    userHandle,
    sessionId,
    scopes,
    issuedAt,
    expiredAt,

    get valid() {
      const now = Temporal.Now.instant();
      return Temporal.Instant.compare(now, expiredAt) <= 0;
    },
  } satisfies IAuthenticationToken as AuthenticationToken;
};

AuthenticationToken.accessToken = (params: {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
}) =>
  AuthenticationToken({
    ...params,
    scopes: [],
  });

AuthenticationToken.refreshToken = (params: {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
}) =>
  AuthenticationToken({
    ...params,
    scopes: [Scope.refresh],
  });
