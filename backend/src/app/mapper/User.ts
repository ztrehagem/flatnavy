import type * as prisma from "@prisma/client";
import { User } from "../model/User/User.js";
import { UserHandle } from "../model/User/UserHandle.js";
import { UserName } from "../model/User/UserName.js";
import { UserId } from "../model/User/UserId.js";

export type UserRecord = Pick<prisma.User, "id" | "handle" | "name">;

export const mapUser = (record: UserRecord): User => {
  return User.create({
    id: UserId.create(record.id),
    handle: UserHandle.create(record.handle)[1]!,
    name: record.name ? UserName.create(record.name)[1]! : null,
  });
};
