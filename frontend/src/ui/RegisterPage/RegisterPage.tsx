import React from "react";
import * as css from "./RegisterPage.css.js";
import { RegisterForm } from "./RegisterForm.js";

export const RegisterPage: React.FC = () => {
  return (
    <div className={css.root}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
