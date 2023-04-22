import { style } from "@vanilla-extract/css";
import { bgStrong } from "../../style/color.css.js";

export const submitButton = style({
  borderRadius: "99px",
  background: bgStrong,
  padding: "4px 12px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  cursor: "pointer",
});
