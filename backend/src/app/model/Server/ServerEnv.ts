import { Temporal } from "@js-temporal/polyfill";
import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";

const DOMAIN_NAME_PATTERN = /^(?:[A-Z0-9-]+\.)*[A-Z0-9-]+$/i;

export type Params = {
  readonly domain: string;
  readonly accessTokenTtl: Temporal.Duration | Temporal.DurationLike | string;
  readonly refreshTokenTtl: Temporal.Duration | Temporal.DurationLike | string;
};

export class ServerEnv {
  #_brand!: never;

  readonly domain: string;
  readonly tokenIssuer: string;
  readonly tokenAudienceWeb: string;
  readonly accessTokenTtl: Temporal.Duration;
  readonly refreshTokenTtl: Temporal.Duration;

  static create(params: Params): Result<ServerEnv, InvalidParameterError> {
    if (!DOMAIN_NAME_PATTERN.exec(params.domain)) {
      return [new InvalidParameterError(ServerEnv, "invalid domain name")];
    }

    return [null, new ServerEnv(params)];
  }

  private constructor(params: Params) {
    this.domain = params.domain;
    this.tokenIssuer = `https://${params.domain}`;
    this.tokenAudienceWeb = `https://${params.domain}`;
    this.accessTokenTtl = Temporal.Duration.from(params.accessTokenTtl);
    this.refreshTokenTtl = Temporal.Duration.from(params.refreshTokenTtl);
  }
}
