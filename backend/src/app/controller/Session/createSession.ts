import type { RouteHandlerMethod } from "fastify";
import type { Context } from "../../context.js";
import type { RequestPayload, ResponsePayload } from "@flatnavy/api";
import { UserHandle } from "../../model/User/UserHandle.js";
import { serializeUser } from "../../serializer/User.js";

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

    const [eHandle, handle] = UserHandle.create(body.handle);

    if (eHandle) {
      return await reply.status(400).send();
    }

    const authentication = await userRepository.getUserAuthenticationByHandle(
      handle
    );

    if (!authentication) {
      return await reply.status(400).send();
    }

    const isMatched = await authentication.password.compare(body.password);

    if (!isMatched) {
      return await reply.status(400).send();
    }

    const { accessToken, refreshToken } = await sessionService.createSession({
      user: authentication.user,
    });
    const serverKey = await serverKeyRepository.get();
    const accessTokenJwt = await serverKey.signToken(accessToken);
    const refreshTokenJwt = await serverKey.signToken(refreshToken);

    const res: ResponsePayload<"/api/auth", "post">["201"]["application/json"] =
      {
        user: serializeUser(authentication.user),
        accessToken: accessTokenJwt,
        refreshToken: refreshTokenJwt,
      };

    await reply.status(201).type("application/json").send(res);
  };
