import React, { useState, type FormEvent } from "react";
import { createSession } from "@flatnavy/api/client";
import * as css from "./LoginForm.css.js";
import { Fieldset } from "../Input/Fieldset.jsx";
import { TextInput } from "../Input/TextInput.jsx";
import { Button } from "../Input/Button.jsx";
import { apiClientContext } from "../../lib/api.js";

export const LoginForm: React.FC = () => {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    void createSession(apiClientContext)({ handle, password })
      .then(([error, result]) => {
        if (error) {
          alert(`Error: ${error}`);
        } else {
          alert(`LoggedIn: ${result.user.handle}`);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
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
    </form>
  );
};
