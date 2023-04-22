import React from "react";
import { location } from "../../router/utils.js";
import { NavigationLink } from "./NavigationLink.jsx";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import * as css from "./Navigation.css.js";
import { useSession } from "../../model/Session/useSession.js";

export const Navigation: React.FC = () => {
  const session = useSession();

  const homeLocation = location("/", {});
  const usersLocation = location("/users", {});
  const registerLocation = location("/register", {});
  const loginLocation = location("/login", {});
  const myPageLocation = location("/me", {});

  return (
    <nav>
      <ul className={css.list}>
        <NavigationLink to={homeLocation}>
          <MaterialSymbol name="home" size="x-large" />
        </NavigationLink>

        <NavigationLink to={usersLocation}>
          <MaterialSymbol name="person_search" size="x-large" />
        </NavigationLink>

        {session ? (
          <NavigationLink to={myPageLocation}>
            @{session.user.handle}
          </NavigationLink>
        ) : (
          <>
            <NavigationLink to={registerLocation}>
              <MaterialSymbol name="person_add" size="x-large" />
            </NavigationLink>
            <NavigationLink to={loginLocation}>
              <MaterialSymbol name="login" size="x-large" />
            </NavigationLink>
          </>
        )}
      </ul>
    </nav>
  );
};
