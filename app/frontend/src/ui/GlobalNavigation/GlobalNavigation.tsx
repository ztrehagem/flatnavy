import { defineComponent } from "vue";
import * as css from "./GlobalNavigation.css.js";
import { RouterLink } from "vue-router";
import { location } from "../../router/utils.js";

export const GlobalNavigation = defineComponent({
  setup() {
    const homeLocation = location("/", {});
    const usersLocation = location("/users", {});

    return () => (
      <div class={css.root}>
        <h1>FlatNavy</h1>

        <nav>
          <ul>
            <li>
              <RouterLink to={homeLocation}>Home</RouterLink>
              <RouterLink to={usersLocation}>Users</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  },
});
