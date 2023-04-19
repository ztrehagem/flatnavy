import React from "react";
import * as css from "./MaterialSymbol.css.js";

export type Props = {
  name: string;
};

export const MaterialSymbol: React.FC<Props> = ({ name }) => {
  return <span className={css.root}>{name}</span>;
};
