import { useCallback, useState } from "react";
import type {
  InvalidParametersError,
  UnauthenticatedError,
  UnexpectedResponseError,
} from "@flatnavy/api/client";
import { createPost } from "@flatnavy/api/client";
import type { Result } from "../../lib/Result.js";
import { apiClientContext } from "../../lib/api.js";
import { Post } from "./Post.type.js";
import { PostId } from "./PostId.type.js";

export type SendPostParams = {
  body: string;
};

export type SendPostResult = Post;

export type SendPostError =
  | UnauthenticatedError
  | InvalidParametersError
  | UnexpectedResponseError;

export type SendPost = (
  params: SendPostParams
) => Promise<Result<SendPostResult, SendPostError>>;

export type Return = {
  error: SendPostError | null;
  submitting: boolean;
  sendPost: SendPost;
};

export const useSendPost = (): Return => {
  const [error, setError] = useState<SendPostError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const sendPost = useCallback<SendPost>(async ({ body }) => {
    try {
      setSubmitting(true);

      const [error, result] = await createPost(apiClientContext)({
        body,
      });

      if (error) {
        setError(error);
        return [error];
      }

      const postId = PostId(result.id);
      const post = Post({ postId, body: result.body });

      setError(null);

      return [null, post];
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { error, submitting, sendPost };
};
