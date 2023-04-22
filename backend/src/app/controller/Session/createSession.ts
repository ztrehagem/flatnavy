import type { RouteHandlerMethod } from "fastify";
import type { Context } from "../../context.js";
import type { RequestPayload, ResponsePayload } from "@flatnavy/api";
import { UserHandle } from "../../model/User/UserHandle.js";

export const createSession =
  ({
    env,
    userRepository,
    serverKeyRepository,
    sessionService,
  }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const body = req.body as RequestPayload<
      "/api/auth",
      "post"
    >["application/json"];

    const [eHandle, handle] = UserHandle(body.handle);

    if (eHandle) {
      return await reply.status(400).send();
    }

    const registration = await userRepository.getRegistrationByHandle(handle);

    if (!registration) {
      return await reply.status(400).send();
    }

    const isMatched = await registration.password.compare(body.password);

    if (!isMatched) {
      return await reply.status(400).send();
    }

    const { accessToken, refreshToken } = await sessionService.createSession({
      user: registration.user,
    });
    const serverKey = await serverKeyRepository.get();
    const accessTokenJwt = await serverKey.signToken(accessToken);
    const refreshTokenJwt = await serverKey.signToken(refreshToken);

    const res: ResponsePayload<"/api/auth", "post">["201"]["application/json"] =
      {
        user: {
          handle: registration.user.handle.value,
          name: registration.user.name,
        },
        accessToken: accessTokenJwt,
        refreshToken: refreshTokenJwt,
      };

    await reply.status(201).type("application/json").send(res);
  };
