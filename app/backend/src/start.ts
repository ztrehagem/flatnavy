import { app } from "./app.js";

app.listen({ host: "0.0.0.0", port: 3000 }, (error, address) => {
  if (error) {
    throw error;
  }

  console.log(`Server is now listening on ${address}`);
});
