import { globalStyle } from "@vanilla-extract/css";
import { dark, light } from "./style/rgb.js";

globalStyle(":where(body *)", {
  all: "unset",
});

globalStyle("body", {
  all: "unset",
  background: dark(),
  color: light(),
  fontFamily: "Kanit, sans-serif",
});
