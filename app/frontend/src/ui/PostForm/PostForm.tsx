import { defineComponent, ref } from "vue";
import * as css from "./PostForm.css.js";
import { api } from "../../lib/api.js";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";

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
        <div class={css.postHeader}>
          <div></div>

          <button type="submit" class={css.submitButton}>
            <MaterialSymbol name="send" />
            Post
          </button>
        </div>

        <textarea
          v-model={input.value}
          placeholder="what you say"
          class={css.textarea}
        ></textarea>
      </form>
    );
  },
});
