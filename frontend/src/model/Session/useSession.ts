import { useAtomValue } from "jotai";
import { ContextError } from "../../error/ContextError.js";
import type { Session } from "./Session.type.js";
import { sessionState } from "./Session.state.js";

interface UseSession {
  (assert: void): Session | null;
  (assert: true): Session;
}

export const useSession: UseSession = (assert) => {
  const session = useAtomValue(sessionState);

  if (assert && !session) {
    throw new ContextError();
  }

  return session as ReturnType<UseSession>;
};
