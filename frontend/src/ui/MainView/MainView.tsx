import { defineComponent, onUnmounted, provide } from "vue";
import { Timeline } from "../../state/Timeline.js";
import { PostForm } from "../PostForm/PostForm.js";
import { TimelineView } from "../TimelineView/TimelineView.js";
import * as css from "./MainView.css.js";

export const MainView = defineComponent({
  setup: () => {
    const timeline = new Timeline();
    provide(Timeline.key, timeline);

    onUnmounted(() => {
      timeline.destruct();
    });

    return () => (
      <div class={css.root}>
        <PostForm />

        <TimelineView />
      </div>
    );
  },
});
