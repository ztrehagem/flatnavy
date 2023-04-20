import React, { type ComponentProps } from "react";
import * as css from "./TextInput.css.js";

export type Props = ComponentProps<"input"> & {
  pre?: React.ReactNode;
  post?: React.ReactNode;
};

export const TextInput: React.FC<Props> = ({ pre, post, ...inputProps }) => {
  return (
    <span className={css.input}>
      {pre}
      <input {...inputProps} />
      {post}
    </span>
  );
};
