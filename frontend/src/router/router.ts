import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
