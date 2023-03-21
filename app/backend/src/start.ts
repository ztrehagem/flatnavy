import { app } from "./app.js";

const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);

app.listen({ host, port }, (error, address) => {
  if (error) {
    throw error;
  }

  console.log(`Server is now listening on ${address}`);
});
