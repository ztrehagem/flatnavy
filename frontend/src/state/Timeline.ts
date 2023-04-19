// import type { InjectionKey } from "vue";
// import { ref } from "vue";
// import { apiOrigin } from "../lib/api.js";

// export class Timeline {
//   readonly #eventSource: EventSource;
//   readonly #posts = ref<string[]>([]);

//   constructor() {
//     const url = new URL("/api/sse", apiOrigin);
//     const eventSource = new EventSource(url);
//     eventSource.addEventListener("message", (e: MessageEvent<string>) => {
//       const obj = JSON.parse(e.data) as { type: string; post: string };
//       if (obj.type != "post") return;
//       this.#push(obj.post);
//     });

//     this.#eventSource = eventSource;
//   }

//   get posts(): readonly string[] {
//     return this.#posts.value;
//   }

//   destruct(): void {
//     this.#eventSource.close();
//   }

//   #push(post: string): void {
//     this.#posts.value.unshift(post);
//   }

//   static readonly key: InjectionKey<Timeline> = Symbol();
// }
