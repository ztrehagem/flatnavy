import React, { useState, type FormEvent } from "react";
import * as css from "./RegisterForm.css.js";
import { createUser } from "@flatnavy/api/client";
import { apiClientContext } from "../../lib/api.js";
import { Fieldset } from "../Input/Fieldset.jsx";
import { TextInput } from "../Input/TextInput.jsx";
import { Button } from "../Input/Button.jsx";

export const RegisterForm: React.FC = () => {
  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    void createUser(apiClientContext)({
      handle,
      name,
      password,
    })
      .then(([error, result]) => {
        if (error) {
          alert(`Error: ${error}`);
        } else {
          alert(`Created: ${result.user.handle}`);
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

      <Fieldset legend="Display Name">
        <TextInput
          name="name"
          type="text"
          autoComplete="name"
          maxLength={64}
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      <Button type="submit" preSymbol="done">
        Register
      </Button>
    </form>
  );
};
