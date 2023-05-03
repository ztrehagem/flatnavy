import operations from "@ztrehagem/openapi-to-fastify-schema/generated";
import type { Context } from "../../context.js";
import { NewPost } from "../../model/Post/NewPost.js";
import { serializePost } from "../../serializer/Post.js";
import { defineRoute } from "../defineRoute.js";

export const createPostTyped = defineRoute(
  ({
    httpAuthenticationService,
    userRepository,
    postRepository,
    timelineRepository,
  }: Context) => ({
    ...operations.createPost,
    handler: async (req, reply) => {
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

      const newPost = NewPost.create({ body: req.body.body, user });

      if (!newPost) {
        return await reply.status(400).send();
      }

      const post = await postRepository.create(newPost);

      await timelineRepository.publish(post);

      return await reply.status(201).send({
        post: serializePost(post),
      });
    },
  })
);
