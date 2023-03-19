import { defineComponent, provide } from "vue";
import { Timeline } from "./state/Timeline.js";
import { PostForm } from "./ui/PostForm/PostForm.jsx";
import { TimelineView } from "./ui/TimelineView/TimelineView.jsx";

export const App = defineComponent({
  setup: (props) => {
    provide(Timeline.key, new Timeline());

    return () => (
      <div>
        <h1>plainstyle</h1>

        <PostForm />

        <TimelineView />
      </div>
    );
  },
});
