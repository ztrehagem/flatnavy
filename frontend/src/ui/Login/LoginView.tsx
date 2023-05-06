import React from "react";
import * as css from "./LoginView.css.js";
import { LoginForm } from "./LoginForm.jsx";

export const LoginView: React.FC = () => {
  return (
    <div className={css.root}>
      <LoginForm />
    </div>
  );
};
