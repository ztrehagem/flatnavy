import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { ErrorPage } from "../ui/ErrorPage/ErrorPage.jsx";
import { RootLayout } from "../ui/RootLayout/RootLayout.jsx";

const secondaryRoutes = [
  {
    path: "" as const,
    Component: lazy(() => import("../ui/MainPage/MainPage.jsx")),
  },
  {
    path: "register" as const,
    Component: lazy(() => import("../ui/RegisterPage/RegisterPage.jsx")),
  },
  {
    path: "login" as const,
    Component: lazy(() => import("../ui/LoginPage/LoginPage.jsx")),
  },
  {
    path: "me" as const,
    Component: lazy(() => import("../ui/MyPage/MyPage.jsx")),
  },
  {
    path: "users" as const,
    Component: lazy(() => import("../ui/UserIndexPage/UserIndexPage.jsx")),
  },
  {
    path: ":userHandle" as const,
    Component: lazy(() => import("../ui/UserPage/UserPage.jsx")),
    loader: ({ params }) => {
      if (!params.userHandle?.startsWith("@")) {
        throw new Response(null, {
          status: 404,
          statusText: "Not Found",
        });
      }
      return null;
    },
  },
] satisfies RouteObject[];

export const routes = [
  {
    path: "" as const,
    Component: RootLayout,
    children: [
      {
        path: "" as const,
        ErrorBoundary: ErrorPage,
        children: secondaryRoutes,
      },
    ],
  },
] satisfies RouteObject[];
