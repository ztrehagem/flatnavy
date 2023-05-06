import React from "react";
import * as css from "./LoginPage.css.js";
import { LoginForm } from "./LoginForm.js";

export const LoginPage: React.FC = () => {
  return (
    <div className={css.root}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
