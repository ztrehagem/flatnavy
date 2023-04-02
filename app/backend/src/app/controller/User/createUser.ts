import { RouteHandlerMethod } from "fastify";
import { RequestPayload, ResponsePayload } from "@flatnavy/lib-api";
import { Context } from "../../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { User } from "../../model/User/User.js";
import { UserRegistration } from "../../model/User/UserRegistration.js";
import { HashedUserPassword } from "../../model/User/HashedUserPassword.js";
import { UserId } from "../../model/User/UserId.js";
import { UsedUserHandleError } from "../../error/UsedUserHandleError.js";

export const createUser =
  ({ userRepository }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const body = req.body as RequestPayload<
      "/api/users",
      "post"
    >["application/json"];

    // TODO: handle validation error
    const handle = new UserHandle(body.handle);
    const user = new User({
      id: UserId.empty(),
      handle,
      name: body.name,
    });
    const password = await HashedUserPassword.from(body.password);
    const registration = new UserRegistration({ user, password });
    const [error, createdUser] = await userRepository.create(registration);

    if (error) {
      if (error instanceof UsedUserHandleError) {
        await reply.status(409).send();
        return;
      }
      await reply.status(500).send();
      return;
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
