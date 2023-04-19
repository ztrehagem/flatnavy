import React from "react";
import type { RouteObject } from "react-router-dom";
import { MainView } from "../ui/MainView/MainView.jsx";
import { GlobalLayout } from "../ui/GlobalLayout/GlobalLayout.jsx";
import { UserIndexView } from "../ui/UserIndexView/UserIndexView.jsx";
import { RegisterView } from "../ui/RegisterView/RegisterView.jsx";

export const routes = [
  {
    path: "" as const,
    element: <GlobalLayout />,
    children: [
      {
        path: "" as const,
        element: <MainView />,
      },
      {
        path: "register" as const,
        element: <RegisterView />,
      },
      {
        path: "users" as const,
        element: <UserIndexView />,
      },
      {
        path: "users/:userId" as const,
        element: <div>users/:userId</div>,
      },
    ],
  },
] satisfies RouteObject[];
