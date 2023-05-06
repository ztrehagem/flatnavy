import { useCallback, useState } from "react";
import type {
  ConflictedError,
  InvalidParametersError,
  UnexpectedResponseError,
} from "@flatnavy/api/client";
import { createUser } from "@flatnavy/api/client";
import { useSetAtom } from "jotai";
import type { Result } from "../../lib/Result.js";
import { apiClientContext } from "../../lib/api.js";
import { User } from "../User/User.type.js";
import { sessionState } from "./Session.state.js";
import { Session } from "./Session.type.js";

export type RegisterParams = {
  handle: string;
  name: string;
  password: string;
};

export type RegisterResult = Session;

export type RegisterError =
  | InvalidParametersError
  | ConflictedError
  | UnexpectedResponseError;

export type Register = (
  params: RegisterParams
) => Promise<Result<RegisterResult, RegisterError>>;

export type Return = {
  error: RegisterError | null;
  submitting: boolean;
  register: Register;
};

export const useRegister = (): Return => {
  const [error, setError] = useState<RegisterError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const setSession = useSetAtom(sessionState);

  const register = useCallback<Register>(async ({ handle, name, password }) => {
    try {
      setSubmitting(true);

      const [error, result] = await createUser(apiClientContext)({
        handle,
        name,
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

  return {
    error,
    submitting,
    register,
  };
};
