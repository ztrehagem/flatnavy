import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Fieldset } from "../Input/Fieldset.jsx";
import { TextInput } from "../Input/TextInput.jsx";
import { Button } from "../Input/Button.jsx";
import { useLogin } from "../../model/Session/useLogin.js";
import { location } from "../../router/utils.js";
import * as css from "./LoginForm.css.js";

export const LoginForm: React.FC = () => {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const { login, submitting, error } = useLogin();
  const navigate = useNavigate();
  const homeLocation = location("/", {});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    void login({ handle, password }).then(
      ([error]) => !error && navigate(homeLocation)
    );
  };

  return (
    <form onSubmit={onSubmit} className={css.form}>
      <Fieldset legend="Handle">
        <TextInput
          name="handle"
          type="text"
          autoComplete="username"
          autoFocus
          maxLength={64}
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          pre={"@"}
        />
      </Fieldset>

      <Fieldset legend="Password">
        <TextInput
          name="password"
          type="password"
          autoComplete="new-password"
          maxLength={64}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Fieldset>

      <Button type="submit" preSymbol="login">
        Login
      </Button>

      {error && <p>{error.name}</p>}
    </form>
  );
};
