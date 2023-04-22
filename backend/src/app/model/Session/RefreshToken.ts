import type { Temporal } from "@js-temporal/polyfill";
import type { Brand } from "../../../utils/Brand.js";
import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";
import type { UserHandle } from "../User/UserHandle.js";
import { Scope } from "./Scope.js";
import type { SessionId } from "./SessionId.js";

declare const brand: unique symbol;

type IRefreshToken = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
};

export type RefreshToken = Brand<IRefreshToken, typeof brand>;

export type Params = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
};

export const RefreshToken = (
  params: Params
): Result<RefreshToken, InvalidParameterError> => {
  if (!params.scopes.includes(Scope.refresh)) {
    return [new InvalidParameterError(RefreshToken, "invalid scope")];
  }

  const refreshToken = {
    issuer: params.issuer,
    audience: params.audience,
    userHandle: params.userHandle,
    sessionId: params.sessionId,
    scopes: params.scopes,
    issuedAt: params.issuedAt,
    expiredAt: params.expiredAt,
  } satisfies IRefreshToken as RefreshToken;

  return [null, refreshToken];
};
