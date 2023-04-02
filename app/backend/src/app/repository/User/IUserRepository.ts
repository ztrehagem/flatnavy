import { Result } from "../../../utils/Result.js";
import { UnexpectedError } from "../../error/UnexpectedError.js";
import { User } from "../../model/User/User.js";
import { UserRegistration } from "../../model/User/UserRegistration.js";
import { UsedUserHandleError } from "../../error/UsedUserHandleError.js";

export interface IUserRepository {
  create(
    userRegistration: UserRegistration
  ): Promise<Result<User, UsedUserHandleError | UnexpectedError>>;
}
