import React, { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { RootLayout } from "../ui/RootLayout/RootLayout.jsx";
import { Authenticated } from "../model/Session/Authenticated.jsx";

const MainPage = lazy(() => import("../ui/MainPage/MainPage.jsx"));
const UserIndexPage = lazy(
  () => import("../ui/UserIndexPage/UserIndexPage.jsx")
);
const RegisterPage = lazy(() => import("../ui/RegisterPage/RegisterPage.jsx"));
const LoginPage = lazy(() => import("../ui/LoginPage/LoginPage.jsx"));
const MyPage = lazy(() => import("../ui/MyPage/MyPage.jsx"));
const UserPage = lazy(() => import("../ui/UserPage/UserPage.jsx"));

export const routes = [
  {
    path: "" as const,
    element: <RootLayout />,
    children: [
      {
        path: "" as const,
        element: <MainPage />,
      },
      {
        path: "register" as const,
        element: <RegisterPage />,
      },
      {
        path: "login" as const,
        element: <LoginPage />,
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
        element: <UserIndexPage />,
      },
      {
        path: ":userHandle" as const,
        element: <UserPage />,
        loader: ({ params }) => {
          if (!params.userHandle?.startsWith("@")) {
            throw new Response(null, { status: 404 });
          }
          return null;
        },
      },
    ],
  },
] satisfies RouteObject[];
