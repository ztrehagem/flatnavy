import { defineComponent } from "vue";
import { GlobalNavigation } from "../GlobalNavigation/GlobalNavigation.jsx";
import { RouterView } from "vue-router";

export const GlobalLayout = defineComponent({
  setup() {
    return () => (
      <div>
        <GlobalNavigation />
        <RouterView />
      </div>
    );
  },
});
