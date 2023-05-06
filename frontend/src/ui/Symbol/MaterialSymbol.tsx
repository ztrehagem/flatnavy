import React from "react";
import type { CSSProperties } from "@vanilla-extract/css";
import * as css from "./MaterialSymbol.css.js";

export type Props = {
  name: string;
  size?: CSSProperties["fontSize"];
};

export const MaterialSymbol: React.FC<Props> = ({ name, size }) => {
  const fontSize = size as React.CSSProperties["fontSize"];

  return (
    <span className={css.root} style={{ fontSize }}>
      {name}
    </span>
  );
};
