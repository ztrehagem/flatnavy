import { components, paths } from "./spec.generated.js";

export type schemas = components["schemas"];

export type Operation<
  Method extends keyof paths[Path],
  Path extends keyof paths
> = paths[Path][Method];
