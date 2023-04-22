import { useCallback, useState } from "react";
import type { Result } from "../../lib/Result.js";
import type {
  InvalidParametersError,
  UnexpectedResponseError,
} from "@flatnavy/api/client";
import { deleteSession } from "@flatnavy/api/client";
import { apiClientContext } from "../../lib/api.js";
import { useSetAtom } from "jotai";
import { sessionState } from "./Session.state.js";

export type LogoutParams = void;

export type LogoutResult = null;

export type LogoutError = InvalidParametersError | UnexpectedResponseError;

export type Logout = (
  params: LogoutParams
) => Promise<Result<LogoutResult, LogoutError>>;

export type Return = {
  error: LogoutError | null;
  submitting: boolean;
  logout: Logout;
};

export const useLogout = (): Return => {
  const [error, setError] = useState<LogoutError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const setSession = useSetAtom(sessionState);

  const logout = useCallback<Logout>(async () => {
    try {
      setSubmitting(true);

      const [error] = await deleteSession(apiClientContext)();

      if (error) {
        setError(error);
        return [error];
      }

      setError(null);
      setSession(null);

      return [null, null];
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { error, submitting, logout };
};
