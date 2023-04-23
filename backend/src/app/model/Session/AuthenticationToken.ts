import { Temporal } from "@js-temporal/polyfill";
import type { UserHandle } from "../User/UserHandle.js";
import type { SessionId } from "./SessionId.js";
import { Scope } from "./Scope.js";

export type Params = {
  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;
};

export class AuthenticationToken {
  #_brand!: never;

  readonly issuer: string;
  readonly audience: readonly string[];
  readonly userHandle: UserHandle;
  readonly sessionId: SessionId;
  readonly scopes: readonly string[];
  readonly issuedAt: Temporal.Instant;
  readonly expiredAt: Temporal.Instant;

  static accessToken(params: {
    readonly issuer: string;
    readonly audience: readonly string[];
    readonly userHandle: UserHandle;
    readonly sessionId: SessionId;
    readonly issuedAt: Temporal.Instant;
    readonly expiredAt: Temporal.Instant;
  }): AuthenticationToken {
    return this.create({ ...params, scopes: [] });
  }

  static refreshToken(params: {
    readonly issuer: string;
    readonly audience: readonly string[];
    readonly userHandle: UserHandle;
    readonly sessionId: SessionId;
    readonly issuedAt: Temporal.Instant;
    readonly expiredAt: Temporal.Instant;
  }): AuthenticationToken {
    return this.create({ ...params, scopes: [Scope.refresh] });
  }

  static create(params: Params): AuthenticationToken {
    return new AuthenticationToken(params);
  }

  private constructor(params: Params) {
    this.issuer = params.issuer;
    this.audience = params.audience;
    this.userHandle = params.userHandle;
    this.sessionId = params.sessionId;
    this.scopes = params.scopes;
    this.issuedAt = params.issuedAt;
    this.expiredAt = params.expiredAt;
  }

  get valid(): boolean {
    const now = Temporal.Now.instant();
    return Temporal.Instant.compare(now, this.expiredAt) <= 0;
  }
}
