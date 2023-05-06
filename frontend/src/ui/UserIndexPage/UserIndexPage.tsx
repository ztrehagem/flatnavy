import React, { useEffect, useState } from "react";
import type { schemas } from "@flatnavy/api";
import { indexUser } from "@flatnavy/api/client";
import { Link } from "react-router-dom";
import { apiClientContext } from "../../lib/api.js";
import { getUserPageLocation } from "../../router/utils.js";
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
          <UserView key={user.handle} user={user} />
        ))}
      </ul>
    </div>
  );
};

const UserView: React.FC<{ user: schemas["User"] }> = ({ user }) => {
  const userPageLocation = getUserPageLocation(user.handle);

  return (
    <li key={user.handle}>
      <div>
        <Link to={userPageLocation}>{user.name}</Link>
      </div>

      <div>@{user.handle}</div>
    </li>
  );
};

export default UserIndexPage;
