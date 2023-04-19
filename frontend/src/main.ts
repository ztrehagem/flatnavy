import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "./style/global.css.js";
import { Root } from "./Root.jsx";

const container = window.document.getElementById("app");
const root = container && createRoot(container);
root?.render(createElement(Root));
