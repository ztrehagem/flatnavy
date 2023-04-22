import React, { useState, type FormEvent } from "react";
import * as css from "./RegisterForm.css.js";
import { Fieldset } from "../Input/Fieldset.jsx";
import { TextInput } from "../Input/TextInput.jsx";
import { Button } from "../Input/Button.jsx";
import { useRegister } from "../../model/Session/useRegister.js";
import { useNavigate } from "react-router-dom";
import { location } from "../../router/utils.js";

export const RegisterForm: React.FC = () => {
  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { register, submitting, error } = useRegister();
  const navigate = useNavigate();
  const homeLocation = location("/", {});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    void register({ handle, name, password }).then(
      ([error]) => !error && navigate(homeLocation)
    );
  };

  return (
    <form onSubmit={onSubmit} className={css.form}>
      {error && <p>{error}</p>}

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
