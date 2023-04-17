import * as prisma from "@prisma/client";
import { User } from "../../../app/model/User/User.js";
import { UserHandle } from "../../../app/model/User/UserHandle.js";
import { UserId } from "../../../app/model/User/UserId.js";
import { UserRegistration } from "../../../app/model/User/UserRegistration.js";
import type { IUserRepository } from "../../../app/repository/User/IUserRepository.js";
import { UsedUserHandleError } from "../../../app/error/UsedUserHandleError.js";
import type { Result } from "../../../utils/Result.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { HashedUserPassword } from "../../../app/model/User/HashedUserPassword.js";

export class UserRepository implements IUserRepository {
  readonly #prisma: prisma.PrismaClient;

  constructor({ prisma }: PrismaRepositoryContext) {
    this.#prisma = prisma;
  }

  async getByHandle(handle: UserHandle): Promise<User | null> {
    const userRecord = await this.#prisma.user.findUnique({
      where: {
        handle: handle.value,
      },
    });

    if (!userRecord) {
      return null;
    }

    return mapUser(userRecord);
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

  async getRegistrationByHandle(
    handle: UserHandle
  ): Promise<UserRegistration | null> {
    const record = await this.#prisma.user.findUnique({
      where: {
        handle: handle.value,
      },
      include: {
        authentication: true,
      },
    });

    if (!record || !record.authentication) {
      return null;
    }

    const user = mapUser(record);
    const password = HashedUserPassword(record.authentication.hashedPassword);

    return UserRegistration({ user, password });
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
