import React, { useEffect, useState } from "react";
import type { schemas } from "@flatnavy/api";
import { indexUser } from "@flatnavy/api/client";
import { apiClientContext } from "../../lib/api.js";
import * as css from "./UserIndexPage.css.js";

export const UserIndexPage: React.FC = () => {
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

export default UserIndexPage;
