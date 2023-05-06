import React from "react";
import * as css from "./GlobalHeader.css.js";
import { Navigation } from "./Navigation.js";

export const GlobalHeader: React.FC = () => {
  return (
    <div className={css.root}>
      <h1>FlatNavy</h1>

      <Navigation />
    </div>
  );
};
