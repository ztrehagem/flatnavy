import type { Result } from "../../../utils/Result.js";
import type { User } from "../../model/User/User.js";
import type { UserRegistration } from "../../model/User/UserRegistration.js";
import type { UsedUserHandleError } from "../../error/UsedUserHandleError.js";
import type { UserHandle } from "../../model/User/UserHandle.js";

export interface IUserRepository {
  getByHandle(handle: UserHandle): Promise<User | null>;

  index(): Promise<User[]>;

  create(
    userRegistration: UserRegistration
  ): Promise<Result<User, UsedUserHandleError>>;

  getRegistrationByHandle(handle: UserHandle): Promise<UserRegistration | null>;
}
