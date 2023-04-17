import { randomUUID } from "crypto";
import type { Brand } from "../../../utils/Brand.js";

declare const brand: unique symbol;

type ISessionId = {
  readonly value: string;
}

export type SessionId = Brand<ISessionId, typeof brand>;

export const SessionId = (raw: string): SessionId => {
  return {
    value: raw,
  } satisfies ISessionId as SessionId;
}

SessionId.generate = (): SessionId => {
  return SessionId(randomUUID());
}
