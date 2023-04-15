import type { RouteLocationPathRaw } from "vue-router";
import type { RouteParams, RoutePath } from "./types.js";

export const location = <T extends RoutePath>(
  route: RoutePath,
  params: RouteParams<T>,
  options?: Omit<RouteLocationPathRaw, "path">
): RouteLocationPathRaw => {
  const completedPath = route.replace(
    /\/:([^/:]+)/g,
    (_, name: string) => (params as Record<string, string>)[name]
  );

  return {
    path: completedPath,
    ...options,
  };
};
