import { defineComponent } from "vue";
import { location } from "../../router/utils.js";
import { NavigationItem } from "./NavigationItem.jsx";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import * as css from "./Navigation.css.js";

export const Navigation = defineComponent({
  setup() {
    const homeLocation = location("/", {});
    const usersLocation = location("/users", {});
    const registerLocation = location("/register", {});

    return () => (
      <nav>
        <ul class={css.list}>
          <NavigationItem to={homeLocation}>
            <MaterialSymbol name="home" />
          </NavigationItem>
          <NavigationItem to={usersLocation}>
            <MaterialSymbol name="person_search" />
          </NavigationItem>
          <NavigationItem to={registerLocation}>
            <MaterialSymbol name="person_add" />
          </NavigationItem>
        </ul>
      </nav>
    );
  },
});
