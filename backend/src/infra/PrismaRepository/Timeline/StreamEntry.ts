import type { StreamRecord } from "./StreamRecord.js";

export type StreamEntry = {
  readonly id: string;
  readonly postId: number;
};

export const parseStreamMessage = ({
  id,
  message,
}: {
  id: string;
  message: Record<string, string>;
}): StreamEntry => {
  const record = message as StreamRecord;
  return { id, postId: Number(record.postId) };
};
