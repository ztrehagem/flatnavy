import { Result } from "../../../utils/Result.js";
import { User } from "../../model/User/User.js";
import { UserRegistration } from "../../model/User/UserRegistration.js";
import { UsedUserHandleError } from "../../error/UsedUserHandleError.js";
import { UserHandle } from "../../model/User/UserHandle.js";

export interface IUserRepository {
  getByHandle(handle: UserHandle): Promise<User | null>;

  index(): Promise<User[]>;

  create(
    userRegistration: UserRegistration
  ): Promise<Result<User, UsedUserHandleError>>;
}
