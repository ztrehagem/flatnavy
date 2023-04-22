import React from "react";
import * as css from "./Fieldset.css.js";

export type Props = {
  legend?: string;
  children: React.ReactNode;
};

export const Fieldset: React.FC<Props> = ({ legend, children }) => {
  return (
    <fieldset>
      {legend && <legend className={css.legend}>{legend}</legend>}

      {children}
    </fieldset>
  );
};
