import React from "react";
import * as css from "./GlobalNavigation.css.js";
import { Navigation } from "./Navigation.jsx";

export const GlobalNavigation: React.FC = () => {
  return (
    <div className={css.root}>
      <h1>FlatNavy</h1>

      <Navigation />
    </div>
  );
};
