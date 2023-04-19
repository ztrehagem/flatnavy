import React, { useState, type FormEvent } from "react";
import * as css from "./RegisterForm.css.js";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import { createUser } from "@flatnavy/api/client";
import { apiClientContext } from "../../lib/api.js";

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
      <fieldset>
        <legend>Handle</legend>

        <span className={css.input}>
          <span>@</span>
          <input
            name="handle"
            type="text"
            autoComplete="username"
            autoFocus
            maxLength={64}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
        </span>
      </fieldset>

      <fieldset>
        <legend>Display Name</legend>

        <span className={css.input}>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={64}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
      </fieldset>

      <fieldset>
        <legend>Password</legend>

        <span className={css.input}>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            maxLength={64}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
      </fieldset>

      <button type="submit" className={css.submitButton}>
        <MaterialSymbol name="done" />
        <span>Register</span>
      </button>
    </form>
  );
};
