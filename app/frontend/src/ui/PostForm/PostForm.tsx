import { defineComponent, ref } from "vue";
import * as css from "./PostForm.css.js";
import { apiOrigin } from "../../lib/api.js";

export const PostForm = defineComponent({
  setup() {
    const input = ref("");

    const post = (e: Event) => {
      e.preventDefault();
      void postPost(input.value).then(() => {
        input.value = "";
      });
    };

    return () => (
      <form onSubmit={post} class={css.root}>
        <div>
          <button type="submit">post</button>
        </div>
        <textarea v-model={input.value}></textarea>
      </form>
    );
  },
});

const postPost = async (post: string) => {
  const apiUrl = new URL("/api/posts", apiOrigin);
  await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ post }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
