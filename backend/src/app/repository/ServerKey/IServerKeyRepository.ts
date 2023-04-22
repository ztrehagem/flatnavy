import type { ServerKey } from "../../model/ServerKey/ServerKey.js";

export interface IServerKeyRepository {
  get(): Promise<ServerKey>;
}
