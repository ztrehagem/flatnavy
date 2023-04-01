import { defineComponent, ref } from "vue";
import * as css from "./PostForm.css.js";
import { api } from "../../lib/api.js";

export const PostForm = defineComponent({
  setup() {
    const input = ref("");

    const post = (e: Event) => {
      e.preventDefault();

      void api.createPost({ body: input.value }).then(() => {
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
