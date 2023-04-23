import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";

const DOMAIN_NAME_PATTERN = /^(?:[A-Z0-9-]+\.)*[A-Z0-9-]+$/i;

export type Params = {
  readonly domain: string;
};

export class Env {
  #_brand!: never;

  readonly domain: string;

  static create(params: Params): Result<Env, InvalidParameterError> {
    if (!DOMAIN_NAME_PATTERN.exec(params.domain)) {
      return [new InvalidParameterError(Env, "invalid domain name")];
    }

    return [null, new Env(params)];
  }

  private constructor(params: Params) {
    this.domain = params.domain;
  }
}
