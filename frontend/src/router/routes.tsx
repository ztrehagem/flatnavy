import React from "react";
import type { RouteObject } from "react-router-dom";
import { MainView } from "../ui/MainView/MainView.jsx";
import { RootView } from "../ui/RootView/RootView.jsx";
import { UserIndexView } from "../ui/UserIndexView/UserIndexView.jsx";
import { RegisterView } from "../ui/RegisterView/RegisterView.jsx";
import { LoginView } from "../ui/LoginView/LoginView.jsx";
import { MyPage } from "../ui/MyPage/MyPage.jsx";
import { Authenticated } from "../model/Session/Authenticated.jsx";

export const routes = [
  {
    path: "" as const,
    element: <RootView />,
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
        path: "login" as const,
        element: <LoginView />,
      },
      {
        path: "me" as const,
        element: (
          <Authenticated>
            <MyPage />
          </Authenticated>
        ),
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
