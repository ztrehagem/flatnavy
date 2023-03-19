import { globalStyle } from "@vanilla-extract/css";
import { dark, light } from "./style/rgb.js";

globalStyle("body", {
  all: "unset",
  background: dark(),
  color: light(),
});
