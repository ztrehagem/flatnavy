import { createApp } from "vue";
import { App } from "./App.js";

createApp(App).mount("#app");

fetch("/api/")
  .then((res) => {
    return res.json();
  })
  .then((payload) => {
    console.log(payload);
  });
