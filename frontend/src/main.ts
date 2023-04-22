import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "./style/global.css.js";
import { Root } from "./Root.jsx";
import devSwUrl from "./sw.js?url";
import { logError } from "./lib/log.js";

const swUrl = import.meta.env.DEV ? devSwUrl : "/sw.js";

await navigator.serviceWorker
  .register(swUrl, { scope: "/", type: "module" })
  .catch((error) => logError(error));

const container = window.document.getElementById("app");
const root = container && createRoot(container);
root?.render(createElement(Root));
