import React, { type MouseEvent } from "react";
import { useLogout } from "../../model/Session/useLogout.js";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import { Button } from "../Input/Button.jsx";
import { Authenticated } from "../../model/Session/Authenticated.jsx";
import * as css from "./MyPage.css.js";

export const MyPage: React.FC = () => {
  const { logout } = useLogout();

  const onClickLogout = (e: MouseEvent) => {
    void logout();
  };

  return (
    <Authenticated>
      <div className={css.root}>
        <Button type="button" onClick={onClickLogout}>
          <MaterialSymbol name="logout" />
          Logout
        </Button>
      </div>
    </Authenticated>
  );
};

export default MyPage;
