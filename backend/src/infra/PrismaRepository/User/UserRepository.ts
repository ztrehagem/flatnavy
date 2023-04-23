import * as prisma from "@prisma/client";
import type { User } from "../../../app/model/User/User.js";
import type { UserHandle } from "../../../app/model/User/UserHandle.js";
import type { IUserRepository } from "../../../app/repository/User/IUserRepository.js";
import { UsedUserHandleError } from "../../../app/error/UsedUserHandleError.js";
import type { Result } from "../../../utils/Result.js";
import type { PrismaRepositoryContext } from "../PrismaRepositoryContext.js";
import { HashedUserPassword } from "../../../app/model/User/HashedUserPassword.js";
import type { NewUser } from "../../../app/model/User/NewUser.js";
import { UserAuthentication } from "../../../app/model/User/UserAuthentication.js";
import { mapUser } from "../../../app/mapper/User/User.js";

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

  async create(user: NewUser): Promise<Result<User, UsedUserHandleError>> {
    try {
      const userRecord = await this.#prisma.user.create({
        data: {
          handle: user.handle.value,
          name: user.name.value,
          authentication: {
            create: {
              hashedPassword: user.password.value,
            },
          },
        },
      });

      return [null, mapUser(userRecord)];
    } catch (error) {
      if (error instanceof prisma.Prisma.PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          return [new UsedUserHandleError(user.handle, error)];
        }
      }

      throw error;
    }
  }

  async getUserAuthenticationByHandle(
    handle: UserHandle
  ): Promise<UserAuthentication | null> {
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
    const password = HashedUserPassword.create(
      record.authentication.hashedPassword
    );

    return UserAuthentication.create({ user, password });
  }
}
