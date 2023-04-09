import { globalStyle } from "@vanilla-extract/css";
import { bg, fg } from "./color.css.js";

globalStyle(":where(body, body *)", {
  all: "unset",
  boxSizing: "border-box",
  display: "revert",
  lineHeight: "1",
});

globalStyle("body", {
  background: bg,
  color: fg,
  fontFamily: "Kanit, sans-serif",
});
