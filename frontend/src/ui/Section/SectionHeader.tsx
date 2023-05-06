import React from "react";
import * as css from "./SectionHeader.css.js";

export type Props = {
  children?: React.ReactNode;
};

export const SectionHeader: React.FC<Props> = ({ children }) => {
  return (
    <div className={css.root}>
      <div className={css.text}>{children}</div>
    </div>
  );
};
