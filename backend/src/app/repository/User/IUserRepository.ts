import type { Result } from "../../../utils/Result.js";
import type { User } from "../../model/User/User.js";
import type { UsedUserHandleError } from "../../error/UsedUserHandleError.js";
import type { UserHandle } from "../../model/User/UserHandle.js";
import type { NewUser } from "../../model/User/NewUser.js";
import type { UserAuthentication } from "../../model/User/UserAuthentication.js";

export interface IUserRepository {
  getByHandle(handle: UserHandle): Promise<User | null>;

  index(): Promise<User[]>;

  create(user: NewUser): Promise<Result<User, UsedUserHandleError>>;

  getUserAuthenticationByHandle(
    handle: UserHandle
  ): Promise<UserAuthentication | null>;
}
