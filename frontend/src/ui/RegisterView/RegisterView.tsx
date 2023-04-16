import { defineComponent } from "vue";
import * as css from "./RegisterView.css.js";
import { RegisterForm } from "./RegisterForm.jsx";

export const RegisterView = defineComponent({
  setup() {
    return () => (
      <div class={css.root}>
        <RegisterForm />
      </div>
    );
  },
});
