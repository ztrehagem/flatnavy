import React, { useEffect, useState } from "react";
import * as css from "./UserIndexView.css.js";
import type { schemas } from "@flatnavy/api";
import { indexUser } from "@flatnavy/api/client";
import { apiClientContext } from "../../lib/api.js";

export const UserIndexView: React.FC = () => {
  const [users, setUsers] = useState<Array<schemas["User"]>>([]);

  useEffect(() => {
    void indexUser(apiClientContext)().then(([, users = []]) => {
      setUsers(users);
    });

    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <div className={css.root}>
      <ul className={css.list}>
        {users.map((user) => (
          <li key={user.handle}>
            <div>{user.name}</div>
            <div>@{user.handle}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
