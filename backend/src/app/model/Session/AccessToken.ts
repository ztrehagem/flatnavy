import type { Temporal } from "@js-temporal/polyfill";
import type { Brand } from "../../../utils/Brand.js";
import type { UserHandle } from "../User/UserHandle.js";
import type { SessionId } from "./SessionId.js";

declare const brand: unique symbol

type IAccessToken = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
}

export type AccessToken = Brand<IAccessToken, typeof brand>;

export type Params = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
}

export const AccessToken = (params: Params): AccessToken => {
  return {
    issuer: params.issuer,
    audience: params.audience,
    userHandle: params.userHandle,
    sessionId: params.sessionId,
    scopes: params.scopes,
    issuedAt: params.issuedAt,
    expiredAt: params.expiredAt,
  } satisfies IAccessToken as AccessToken;
}
