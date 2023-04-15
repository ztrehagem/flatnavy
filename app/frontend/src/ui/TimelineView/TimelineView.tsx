import { defineComponent, inject } from "vue";
import * as css from "./TimelineView.css.js";
import { Timeline } from "../../state/Timeline.js";

export const TimelineView = defineComponent({
  setup: () => {
    const timeline = inject(Timeline.key);

    return () => (
      <ul class={css.list}>
        {timeline?.posts.map((post) => (
          <li>{post}</li>
        ))}
      </ul>
    );
  },
});
