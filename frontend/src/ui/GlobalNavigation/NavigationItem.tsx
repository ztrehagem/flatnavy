import { defineComponent, type PropType } from "vue";
import { RouterLink, type RouteLocationRaw } from "vue-router";
import * as css from "./NavigationItem.css.js";

export const NavigationItem = defineComponent({
  props: {
    to: {
      type: Object as PropType<RouteLocationRaw>,
      required: true,
    },
  },

  setup(props, { slots }) {
    return () => (
      <li>
        <RouterLink to={props.to} class={css.link}>
          {slots.default?.()}
        </RouterLink>
      </li>
    );
  },
});
