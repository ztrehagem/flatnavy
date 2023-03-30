import { paths } from "./spec.generated.js";

type Op<
  Method extends keyof paths[Path],
  Path extends keyof paths
> = paths[Path][Method];

export type ApiReqBody<
  Method extends keyof paths[Path],
  Path extends keyof paths
> = Op<Method, Path> extends {
  requestBody?: { content: { "application/json"?: infer U } };
}
  ? U
  : never;
