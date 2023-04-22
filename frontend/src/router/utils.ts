import type { Path } from "react-router-dom";
import type { RouteParams, RoutePath } from "./types.js";

export const location = <T extends RoutePath>(
  route: RoutePath,
  params: RouteParams<T>,
  options?: Omit<Path, "pathname">
): Partial<Path> => {
  const completedPath = route.replace(
    /\/:([^/:]+)/g,
    (_, name: string) => (params as Record<string, string>)[name]
  );

  return {
    pathname: completedPath,
    ...options,
  };
};
