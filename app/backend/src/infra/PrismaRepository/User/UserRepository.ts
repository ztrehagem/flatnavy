import { PrismaClient, Prisma } from "@prisma/client";
import { User } from "../../../app/model/User/User.js";
import { UserHandle } from "../../../app/model/User/UserHandle.js";
import { UserId } from "../../../app/model/User/UserId.js";
import { UserRegistration } from "../../../app/model/User/UserRegistration.js";
import { IUserRepository } from "../../../app/repository/User/IUserRepository.js";
import { UsedUserHandleError } from "../../../app/error/UsedUserHandleError.js";
import { Result } from "../../../utils/Result.js";
import { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";

export class UserRepository implements IUserRepository {
  readonly #prisma: PrismaClient;

  constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }
  async create(
    registration: UserRegistration
  ): Promise<Result<User, UsedUserHandleError>> {
    try {
      const userRecord = await this.#prisma.user.create({
        data: {
          handle: registration.user.handle.valueOf(),
          name: registration.user.name,
          authentication: {
            create: {
              hashedPassword: registration.password.valueOf(),
            },
          },
        },
      });

      const user = User.from({
        id: UserId.from(userRecord.id),
        handle: UserHandle.from(userRecord.handle)!,
        name: userRecord.name,
      })!;

      return [null, user];
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          return [new UsedUserHandleError(registration.user.handle, error)];
        }
      }

      throw error;
    }
  }
}
