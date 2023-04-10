import { defineComponent } from "vue";
import * as css from "./GlobalNavigation.css.js";
import { Navigation } from "./Navigation.jsx";

export const GlobalNavigation = defineComponent({
  setup() {
    return () => (
      <div class={css.root}>
        <h1>FlatNavy</h1>

        <Navigation />
      </div>
    );
  },
});
