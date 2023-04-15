import { server } from "./server.js";

const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);

server.listen({ host, port }, (error, address) => {
  if (error) {
    throw error;
  }

  // eslint-disable-next-line no-console
  console.log(`Server is now listening on ${address}`);
});
