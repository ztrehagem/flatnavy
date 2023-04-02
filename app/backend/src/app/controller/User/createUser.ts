import { RouteHandlerMethod } from "fastify";
import { RequestPayload, ResponsePayload } from "@flatnavy/lib-api";
import { Context } from "../../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { User } from "../../model/User/User.js";
import { UserRegistration } from "../../model/User/UserRegistration.js";
import { HashedUserPassword } from "../../model/User/HashedUserPassword.js";
import { UserId } from "../../model/User/UserId.js";

export const createUser =
  ({ userRepository }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const body = req.body as RequestPayload<
      "/api/users",
      "post"
    >["application/json"];

    const handle = UserHandle.from(body.handle);

    if (!handle) {
      return await reply.status(400).send();
    }

    const user = User.from({
      id: UserId.empty(),
      handle,
      name: body.name,
    });

    if (!user) {
      return await reply.status(400).send();
    }

    const password = await HashedUserPassword.from(body.password);
    const registration = UserRegistration.from({ user, password });
    const [error, createdUser] = await userRepository.create(registration);

    if (error) {
      return await reply.status(409).send();
    }

    const res: ResponsePayload<
      "/api/users",
      "post"
    >["201"]["application/json"] = {
      user: {
        handle: createdUser.handle.valueOf(),
        name: createdUser.name,
      },
    };

    await reply.status(201).type("application/json").send(res);
  };
