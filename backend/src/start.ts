import { createContext } from "./createContext.js";
import { createServer } from "./createServer.js";
import { logInfo } from "./utils/log.js";

const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);

const context = await createContext();

const server = await createServer({ context });

server.listen({ host, port }, (error, address) => {
  if (error) {
    throw error;
  }

  logInfo(`Server is now listening on ${address}`);
});
