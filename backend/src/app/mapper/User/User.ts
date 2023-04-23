import type * as prisma from "@prisma/client";
import { User } from "../../model/User/User.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { UserName } from "../../model/User/UserName.js";
import { UserId } from "../../model/User/UserId.js";

export const mapUser = (record: prisma.User): User => {
  return User.create({
    id: UserId(record.id),
    handle: UserHandle(record.handle)[1]!,
    name: record.name ? UserName.create(record.name)[1]! : null,
  });
};
