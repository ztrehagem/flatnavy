import * as prisma from "@prisma/client";
import { User } from "../../../app/model/User/User.js";
import { UserHandle } from "../../../app/model/User/UserHandle.js";
import { UserId } from "../../../app/model/User/UserId.js";
import { UserRegistration } from "../../../app/model/User/UserRegistration.js";
import { IUserRepository } from "../../../app/repository/User/IUserRepository.js";
import { UsedUserHandleError } from "../../../app/error/UsedUserHandleError.js";
import { Result } from "../../../utils/Result.js";
import { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";

export class UserRepository implements IUserRepository {
  readonly #prisma: prisma.PrismaClient;

  constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }

  async index(): Promise<User[]> {
    const userRecords = await this.#prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return userRecords.map(mapUser);
  }

  async create(
    registration: UserRegistration
  ): Promise<Result<User, UsedUserHandleError>> {
    try {
      const userRecord = await this.#prisma.user.create({
        data: {
          handle: registration.user.handle.value,
          name: registration.user.name,
          authentication: {
            create: {
              hashedPassword: registration.password.value,
            },
          },
        },
      });

      return [null, mapUser(userRecord)];
    } catch (error) {
      if (error instanceof prisma.Prisma.PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          return [new UsedUserHandleError(registration.user.handle, error)];
        }
      }

      throw error;
    }
  }
}

const mapUser = (record: prisma.User): User => {
  const [, handle] = UserHandle(record.handle);

  const [, user] = User({
    id: UserId(record.id)!,
    handle: handle!,
    name: record.name,
  });

  return user!;
};
