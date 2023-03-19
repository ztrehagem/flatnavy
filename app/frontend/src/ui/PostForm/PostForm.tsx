import { defineComponent, inject, ref } from "vue";
import * as css from "./PostForm.css.js";
import { Timeline } from "../../state/Timeline.js";

export const PostForm = defineComponent({
  setup() {
    const timeline = inject(Timeline.key);

    const input = ref("");

    const post = (e: Event) => {
      e.preventDefault();
      timeline?.push(input.value);
      input.value = "";
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
