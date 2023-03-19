import { defineComponent, inject } from "vue";
import { Timeline } from "../../state/Timeline.js";

export const TimelineView = defineComponent({
  setup: () => {
    const timeline = inject(Timeline.key);

    return () => (
      <ul>
        {timeline?.posts.map((post) => (
          <li>{post}</li>
        ))}
      </ul>
    );
  },
});
