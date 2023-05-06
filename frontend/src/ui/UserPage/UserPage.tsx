import React from "react";
import { useLoaderData, type LoaderFunction } from "react-router-dom";
import { getUser } from "@flatnavy/api/client";
import type { schemas } from "@flatnavy/api";
import { apiClientContext } from "../../lib/api.js";
import * as css from "./UserPage.css.js";

export const Component: React.FC = () => {
  const { user } = useLoaderData() as LoaderResult;

  return (
    <div className={css.root}>
      <div>
        <div>{user.name}</div>
        <div>@{user.handle}</div>
      </div>
    </div>
  );
};

type LoaderResult = {
  user: schemas["User"];
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderResult> => {
  if (!params.userHandle?.startsWith("@")) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const userHandle = params.userHandle.slice(1);

  const [eUser, user] = await getUser(apiClientContext)({ userHandle });

  if (eUser?.name == "NotFoundError") {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  if (eUser) {
    throw eUser;
  }

  return { user };
};
