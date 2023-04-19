import React from "react";
import * as css from "./RegisterView.css.js";
import { RegisterForm } from "./RegisterForm.jsx";

export const RegisterView: React.FC = () => {
  return (
    <div className={css.root}>
      <RegisterForm />
    </div>
  );
};
