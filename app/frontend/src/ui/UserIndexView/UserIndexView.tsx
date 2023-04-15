import { defineComponent } from "vue";
import { indexUser } from "@flatnavy/lib-api/client";
import * as css from "./UserIndexView.css.js";
import { apiClientContext } from "../../lib/api.js";

export const UserIndexView = defineComponent({
  async setup() {
    const [, users = []] = await indexUser(apiClientContext)();

    return () => (
      <div class={css.root}>
        <ul class={css.list}>
          {users.map((user) => (
            <li>
              <div>{user.name}</div>
              <div>@{user.handle}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  },
});
