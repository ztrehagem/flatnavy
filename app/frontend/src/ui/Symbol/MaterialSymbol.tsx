import { defineComponent } from "vue";
import * as css from "./MaterialSymbol.css.js";

export const MaterialSymbol = defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    return () => <span class={css.root}>{props.name}</span>;
  },
});
