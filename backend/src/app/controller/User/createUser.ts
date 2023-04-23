import type { RouteHandlerMethod } from "fastify";
import type { RequestPayload, ResponsePayload } from "@flatnavy/api";
import type { Context } from "../../context.js";
import { UserHandle } from "../../model/User/UserHandle.js";
import { HashedUserPassword } from "../../model/User/HashedUserPassword.js";
import { NewUser } from "../../model/User/NewUser.js";
import { UserName } from "../../model/User/UserName.js";
import { serializeUser } from "../../serializer/User.js";

export const createUser =
  ({
    userRepository,
    serverKeyRepository,
    sessionService,
  }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const body = req.body as RequestPayload<
      "/api/users",
      "post"
    >["application/json"];

    const [eHandle, handle] = UserHandle(body.handle);

    if (eHandle) {
      return await reply.status(400).send();
    }

    const [eUserName, userName] = UserName.create(body.name);

    if (eUserName) {
      return await reply.status(400).send();
    }

    const [ePassword, password] = await HashedUserPassword.hash(body.password);

    if (ePassword) {
      return await reply.status(400).send();
    }

    const newUser = NewUser.create({
      handle,
      name: userName,
      password,
    });

    const [error, createdUser] = await userRepository.create(newUser);

    if (error) {
      return await reply.status(409).send();
    }

    const serverKey = await serverKeyRepository.get();
    const { accessToken, refreshToken } = await sessionService.createSession({
      user: createdUser,
    });
    const accessTokenJwt = await serverKey.signToken(accessToken);
    const refreshTokenJwt = await serverKey.signToken(refreshToken);

    const res: ResponsePayload<
      "/api/users",
      "post"
    >["201"]["application/json"] = {
      user: serializeUser(createdUser),
      accessToken: accessTokenJwt,
      refreshToken: refreshTokenJwt,
    };

    await reply.status(201).type("application/json").send(res);
  };
