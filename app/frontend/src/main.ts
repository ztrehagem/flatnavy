import { createApp } from "vue";
import "./style/global.css.js";
import { Root } from "./Root.jsx";
import { router } from "./router/router.js";

const app = createApp(Root);
app.use(router);
app.mount("#app");
