import { type RouteRecordRaw } from "vue-router";
import { GlobalLayout } from "../ui/GlobalLayout/GlobalLayout.jsx";
import { MainView } from "../ui/MainView/MainView.jsx";
import { UserIndexView } from "../ui/UserIndexView/UserIndexView.jsx";
import { RegisterView } from "../ui/RegisterView/RegisterView.jsx";

export const routes = [
  {
    path: "" as const,
    component: GlobalLayout,
    children: [
      {
        path: "" as const,
        component: MainView,
      },
      {
        path: "register" as const,
        component: RegisterView,
      },
      {
        path: "users" as const,
        component: UserIndexView,
      },
      {
        path: "users/:userId" as const,
        component: UserIndexView,
      },
    ],
  },
] satisfies RouteRecordRaw[];
