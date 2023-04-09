import { defineComponent, provide } from "vue";
import { Timeline } from "../../state/Timeline.js";
import { PostForm } from "../PostForm/PostForm.js";
import { TimelineView } from "../TimelineView/TimelineView.js";

export const MainView = defineComponent({
  setup: () => {
    provide(Timeline.key, new Timeline());

    return () => (
      <div>
        <PostForm />

        <TimelineView />
      </div>
    );
  },
});
