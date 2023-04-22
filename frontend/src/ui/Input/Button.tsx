import type { ComponentProps } from "react";
import React from "react";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import * as css from "./Button.css.js";

export type Props = ComponentProps<"button"> & {
  preSymbol?: string;
  children?: React.ReactNode;
};

export const Button: React.FC<Props> = ({
  preSymbol,
  children,
  ...buttonProps
}) => {
  return (
    <button {...buttonProps} className={css.submitButton}>
      {preSymbol && <MaterialSymbol name={preSymbol} />}
      {children}
    </button>
  );
};
