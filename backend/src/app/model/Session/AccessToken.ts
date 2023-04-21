import { Temporal } from "@js-temporal/polyfill";
import type { Brand } from "../../../utils/Brand.js";
import type { UserHandle } from "../User/UserHandle.js";
import type { SessionId } from "./SessionId.js";

declare const brand: unique symbol;

type IAccessToken = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
  get valid(): boolean;
};

export type AccessToken = Brand<IAccessToken, typeof brand>;

export type Params = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
};

export const AccessToken = ({
  issuer,
  audience,
  userHandle,
  sessionId,
  scopes,
  issuedAt,
  expiredAt,
}: Params): AccessToken => {
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
  } satisfies IAccessToken as AccessToken;
};
