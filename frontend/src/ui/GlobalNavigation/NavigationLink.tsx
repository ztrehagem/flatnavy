import React from "react";
import { Link } from "react-router-dom";
import * as css from "./NavigationLink.css.js";
import type { To } from "react-router-dom";

export type Props = {
  to: To;
  children: React.ReactNode;
};

export const NavigationLink: React.FC<Props> = ({ to, children }) => {
  return (
    <li>
      <Link to={to} className={css.link}>
        {children}
      </Link>
    </li>
  );
};
