import type { schemas, OperationPathMethod } from "../../types.js";
import type { ApiClientContext } from "../context.js";

const path: OperationPathMethod<"streamTimelineSSE">["path"] =
  "/api/stream/sse/timeline";

export type TimelineListener = (entries: schemas["TimelineEntry"][]) => void;

type EventStreamListener = (event: MessageEvent<string>) => void;

export enum ReadyState {
  CONNECTING = EventSource.CONNECTING,
  OPEN = EventSource.OPEN,
  CLOSED = EventSource.CLOSED,
}

export type Params = {
  readonly scope: schemas["TimelineScope"];
  readonly listener: TimelineListener;
};

export class TimelineStream {
  readonly #eventSource: EventSource;

  constructor(context: ApiClientContext, params: Params) {
    const listener: EventStreamListener = (event) => {
      const entries = JSON.parse(event.data) as schemas["TimelineEntry"][];
      params.listener(entries);
    };

    const url = new URL(path, context.origin);
    url.searchParams.set("scope", params.scope);

    const eventSource = new EventSource(url);
    eventSource.addEventListener("message", listener);

    this.#eventSource = eventSource;
  }

  close(): void {
    this.#eventSource.close();
  }

  get readyState(): ReadyState {
    return this.#eventSource.readyState;
  }
}
