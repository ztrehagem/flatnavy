import type { Context } from "../../context.js";
import { NewPost } from "../../model/Post/NewPost.js";
import { serializePost } from "../../serializer/Post.js";
import { defineController } from "../defineController.js";

export const createPost = defineController(
  ({
    httpAuthenticationService,
    userRepository,
    postRepository,
    timelineRepository,
  }: Context) => ({
    method: "post",
    path: "/api/posts",
    handler: async ({ body, defineResponse }, req) => {
      const [authenticationError, token] =
        await httpAuthenticationService.parseAuthenticationToken(
          req.headers.authorization ?? ""
        );

      if (authenticationError) {
        return defineResponse({ status: 401 });
      }

      const user = await userRepository.getByHandle(token.userHandle);

      if (!user) {
        return defineResponse({ status: 401 });
      }

      const newPost = NewPost.create({ body: body.body, user });

      if (!newPost) {
        return defineResponse({ status: 400 });
      }

      const post = await postRepository.create(newPost);

      await timelineRepository.publish(post);

      return defineResponse({
        status: 201,
        mime: "application/json",
        body: {
          post: serializePost(post),
        },
      });
    },
  })
);
