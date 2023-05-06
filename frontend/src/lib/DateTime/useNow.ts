import { Temporal } from "@js-temporal/polyfill";
import { atom, getDefaultStore, useAtomValue } from "jotai";

const store = getDefaultStore();

const now = Temporal.Now.instant();

const nowAtom = atom(now);

const updateNow = (now = Temporal.Now.instant()) => {
  store.set(nowAtom, now);
  const timeout = 1000 - (now.epochMilliseconds % 1000);
  setTimeout(updateNow, timeout);
};

updateNow(now);

export const useNow = (): Temporal.Instant => {
  return useAtomValue(nowAtom, { store });
};
