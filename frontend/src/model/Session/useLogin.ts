import { useCallback, useState } from "react";
import type { Result } from "../../lib/Result.js";
import { createSession } from "@flatnavy/api/client";
import { apiClientContext } from "../../lib/api.js";
import { Session } from "./Session.type.js";
import { User } from "../User/User.type.js";
import { useSetAtom } from "jotai";
import { sessionState } from "./Session.state.js";

export type LoginParams = {
  handle: string;
  password: string;
};

export type LoginResult = Session;

export type LoginError = "InvalidParameters" | "UnexpectedResponse";

export type Login = (
  params: LoginParams
) => Promise<Result<LoginResult, LoginError>>;

export type Return = {
  error: LoginError | null;
  submitting: boolean;
  login: Login;
};

export const useLogin = (): Return => {
  const [error, setError] = useState<LoginError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const setSession = useSetAtom(sessionState);

  const login = useCallback<Login>(async ({ handle, password }) => {
    try {
      setSubmitting(true);

      const [error, result] = await createSession(apiClientContext)({
        handle,
        password,
      });

      if (error) {
        setError(error);
        return [error];
      }

      const user = User(result.user);
      const session = Session({ user });

      setError(null);
      setSession(session);

      return [null, session];
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { error, submitting, login };
};
