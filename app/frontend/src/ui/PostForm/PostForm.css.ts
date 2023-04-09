import { style } from "@vanilla-extract/css";
import { accent, bgStrong } from "../../style/color.css.js";

export const root = style({
  borderRadius: "7px",
  backgroundColor: bgStrong,
  display: "grid",
  gridTemplate: "auto auto / auto",
});

export const submitButton = style({
  borderRadius: "7px",
  backgroundColor: accent,
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
});
