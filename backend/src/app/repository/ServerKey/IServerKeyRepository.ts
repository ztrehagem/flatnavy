import type { Result } from "../../../utils/Result.js";
import type { InvalidAuthenticationError } from "../../error/InvalidAuthenticationError.js";

export type JWT = string;
export type Subject = string;

export type SignParams = { subject: Subject };
export type VerifyParams = { jwt: JWT };

export interface IServerKeyRepository {
  sign(params: SignParams): Promise<JWT>;
  verify(
    params: VerifyParams
  ): Promise<Result<Subject, InvalidAuthenticationError>>;
}
