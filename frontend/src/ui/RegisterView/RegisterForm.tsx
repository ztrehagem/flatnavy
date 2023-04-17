import { defineComponent, reactive } from "vue";
import * as css from "./RegisterForm.css.js";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import { createUser } from "@flatnavy/api/client";
import { apiClientContext } from "../../lib/api.js";

export const RegisterForm = defineComponent({
  setup() {
    const inputs = reactive({
      handle: "",
      name: "",
      password: "",
    });

    const state = reactive({
      submitting: false,
    });

    const onSubmit = (e: Event) => {
      e.preventDefault();

      if (state.submitting) return;

      state.submitting = true;

      void createUser(apiClientContext)(inputs)
        .then(([error, result]) => {
          if (error) {
            alert(`Error: ${error}`);
          } else {
            alert(`Created: ${result.user.handle}`);
          }
        })
        .finally(() => {
          state.submitting = false;
        });
    };

    return () => (
      <form onSubmit={onSubmit} class={css.form}>
        <fieldset>
          <legend>Handle</legend>

          <span class={css.input}>
            <span>@</span>
            <input
              name="handle"
              type="text"
              autocomplete="username"
              autofocus
              maxlength={64}
              v-model={inputs.handle}
            />
          </span>
        </fieldset>

        <fieldset>
          <legend>Display Name</legend>

          <span class={css.input}>
            <input
              name="name"
              type="text"
              autocomplete="name"
              maxlength={64}
              v-model={inputs.name}
            />
          </span>
        </fieldset>

        <fieldset>
          <legend>Password</legend>

          <span class={css.input}>
            <input
              name="password"
              type="password"
              autocomplete="new-password"
              maxlength={64}
              v-model={inputs.password}
            />
          </span>
        </fieldset>

        <button type="submit" class={css.submitButton}>
          <MaterialSymbol name="done" />
          <span>Register</span>
        </button>
      </form>
    );
  },
});
