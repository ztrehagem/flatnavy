import { type Path, useParams as useParamsLib } from "react-router-dom";
import type { RouteParams, RoutePath } from "./types.js";

export const location = <T extends RoutePath>(
  route: T,
  params: RouteParams<T>,
  options?: Omit<Path, "pathname">
): Partial<Path> => {
  const completedPath = route.replace(
    /\/:([^/:]+)/g,
    (_, name: string) => `/${(params as Record<string, string>)[name]}`
  );

  return {
    pathname: completedPath,
    ...options,
  };
};

export const getUserPageLocation = (
  userHandle: string,
  options?: Omit<Path, "pathname">
): Partial<Path> => {
  return location("/:userHandle", { userHandle: `@${userHandle}` }, options);
};

export const useParams = <T extends RoutePath>(path: T): RouteParams<T> => {
  return useParamsLib() as RouteParams<T>;
};
