import type { paths } from "@flatnavy/api";
import type { AbstractController, Controller } from "./types.js";

export const defineController =
  <T, Path extends keyof paths, Method extends keyof paths[Path]>(
    factory: (arg: T) => Controller<Path, Method>
  ) =>
  (arg: T): AbstractController =>
    factory(arg) as AbstractController;
