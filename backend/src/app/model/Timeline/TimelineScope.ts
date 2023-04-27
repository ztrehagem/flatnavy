import type { UserId } from "../User/UserId.js";

export enum TimelineScopeKind {
  follow = "follow",
  local = "local",
  global = "global",
  // custom = "custom",
}

export type TimelineScopeParams =
  | { readonly kind: TimelineScopeKind.follow; readonly userId: UserId }
  | { readonly kind: TimelineScopeKind.local }
  | { readonly kind: TimelineScopeKind.global };
// | { readonly kind: TimelineScopeKind.custom; readonly customTimelineId: CustomTimelineId }

export class TimelineScope {
  #_brand!: never;

  readonly params: TimelineScopeParams;

  static create(params: TimelineScopeParams): TimelineScope {
    return new TimelineScope(params);
  }

  private constructor(params: TimelineScopeParams) {
    this.params = params;
  }

  toKey(): string {
    switch (this.params.kind) {
      case TimelineScopeKind.follow: {
        return `${this.params.kind}:${this.params.userId.value}`;
      }
      case TimelineScopeKind.local:
      case TimelineScopeKind.global: {
        return this.params.kind;
      }
    }
  }
}
