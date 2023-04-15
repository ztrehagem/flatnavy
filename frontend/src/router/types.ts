import type { RoutesType } from "../lib/Route/types.js";
import type { routes } from "./routes.js";

export type Route = RoutesType<typeof routes>;
export type RoutePath = keyof Route;
export type RouteParams<T extends RoutePath> = Route[T];
