import React from "react";
import * as css from "./UserIndexView.css.js";

export const UserIndexView: React.FC = () => {
  // const [, users = []] = await indexUser(apiClientContext)();
  const users = ["foo", "bar"];

  return (
    <div className={css.root}>
      <ul className={css.list}>
        {users.map((user) => (
          <li key={user}>
            <div>{user}</div>
            <div>@{user}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
