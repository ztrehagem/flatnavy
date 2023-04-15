import { defineComponent, ref } from "vue";
import * as css from "./PostForm.css.js";
import { apiClientContext } from "../../lib/api.js";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import { createPost } from "@flatnavy/api/client";

export const PostForm = defineComponent({
  setup() {
    const input = ref("");

    const post = (e: Event) => {
      e.preventDefault();

      void createPost(apiClientContext)({ body: input.value }).then(() => {
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
