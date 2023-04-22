import type { Brand } from "../../../utils/Brand.js";
import type { Result } from "../../../utils/Result.js";
import { InvalidParameterError } from "../../error/InvalidParameterError.js";

declare const brand: unique symbol;

type IEnv = {
  readonly domain: string;
};

export type Env = Brand<IEnv, typeof brand>;

export type Params = {
  readonly domain: string;
};

const DOMAIN_NAME_PATTERN = /^(?:[A-Z0-9-]+\.)*[A-Z0-9-]+$/i;

export const Env = ({ domain }: Params): Result<Env, InvalidParameterError> => {
  if (!DOMAIN_NAME_PATTERN.exec(domain)) {
    return [new InvalidParameterError(Env, "invalid domain name")];
  }

  const result = {
    domain,
  } satisfies IEnv as Env;

  return [null, result];
};
