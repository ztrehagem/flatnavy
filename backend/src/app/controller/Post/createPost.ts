import type { RouteHandlerMethod } from "fastify";
import type { RequestPayload, ResponsePayload } from "@flatnavy/api";
import type { Context } from "../../context.js";
import { NewPost } from "../../model/Post/NewPost.js";
import { serializePost } from "../../serializer/Post.js";

export const createPost =
  ({
    httpAuthenticationService,
    userRepository,
    postRepository,
    timelineRepository,
  }: Context): RouteHandlerMethod =>
  async (req, reply) => {
    const { body } = req.body as RequestPayload<
      "/api/posts",
      "post"
    >["application/json"];

    const [authenticationError, token] =
      await httpAuthenticationService.parseAuthenticationToken(
        req.headers.authorization ?? ""
      );

    if (authenticationError) {
      return await reply.status(401).send();
    }

    const user = await userRepository.getByHandle(token.userHandle);

    if (!user) {
      return await reply.status(401).send();
    }

    const newPost = NewPost.create({ body, user });

    if (!newPost) {
      return await reply.status(400).send();
    }

    const post = await postRepository.create(newPost);

    await timelineRepository.publish(post);

    const res: ResponsePayload<
      "/api/posts",
      "post"
    >["201"]["application/json"] = {
      post: serializePost(post),
    };

    await reply.status(201).type("application/json").send(res);
  };
