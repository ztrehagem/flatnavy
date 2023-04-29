import { ProcessEnv } from "./ProcessEnv.js";
import { createContext } from "./createContext.js";
import { createServer } from "./createServer.js";
import { logInfo } from "./utils/log.js";

const context = await createContext();

const server = await createServer({ context });

server.listen(
  {
    host: ProcessEnv.current.listenHost,
    port: ProcessEnv.current.listenPort,
  },
  (error, address) => {
    if (error) {
      throw error;
    }

    logInfo(`Server is now listening on ${address}`);
  }
);
