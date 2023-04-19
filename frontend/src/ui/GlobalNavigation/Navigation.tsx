import React from "react";
import { location } from "../../router/utils.js";
import { NavigationItem } from "./NavigationItem.jsx";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import * as css from "./Navigation.css.js";

export const Navigation: React.FC = () => {
  const homeLocation = location("/", {});
  const usersLocation = location("/users", {});
  const registerLocation = location("/register", {});

  return (
    <nav>
      <ul className={css.list}>
        <NavigationItem to={homeLocation}>
          <MaterialSymbol name="home" />
        </NavigationItem>
        <NavigationItem to={usersLocation}>
          <MaterialSymbol name="person_search" />
        </NavigationItem>
        <NavigationItem to={registerLocation}>
          <MaterialSymbol name="person_add" />
        </NavigationItem>
      </ul>
    </nav>
  );
};
