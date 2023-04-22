import React, { type MouseEvent } from "react";
import * as css from "./MyPage.css.js";
import { useLogout } from "../../model/Session/useLogout.js";
import { MaterialSymbol } from "../Symbol/MaterialSymbol.jsx";
import { Button } from "../Input/Button.jsx";

export const MyPage: React.FC = () => {
  const { logout } = useLogout();

  const onClickLogout = (e: MouseEvent) => {
    void logout();
  };

  return (
    <div className={css.root}>
      <Button type="button" onClick={onClickLogout}>
        <MaterialSymbol name="logout" />
        Logout
      </Button>
    </div>
  );
};
