import type { ServerKey } from "../../model/Server/ServerKey.js";

export interface IServerKeyRepository {
  get(): Promise<ServerKey>;
}
