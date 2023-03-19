import { ref, InjectionKey } from "vue";

export class Timeline {
  #posts = ref<string[]>([]);

  get posts(): readonly string[] {
    return this.#posts.value;
  }

  push(post: string): void {
    this.#posts.value.unshift(post);
  }

  static readonly key: InjectionKey<Timeline> = Symbol();
}
