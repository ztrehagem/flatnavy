import { style } from "@vanilla-extract/css";
import { bgStrong, darkNavy, light, lightNavy } from "../../style/color.css.js";

export const root = style({
  borderRadius: "7px",
  backgroundColor: bgStrong,
  padding: "8px",
  display: "grid",
  gridTemplate: "auto auto / auto",
  gap: "8px",
});

export const postHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const submitButton = style({
  borderRadius: "7px",
  background: `linear-gradient(to right bottom, ${lightNavy}, ${darkNavy})`,
  color: light,
  padding: "8px 12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
});

export const submitText = style({
  fontSize: "small",
});

export const textarea = style({
  padding: "0 8px",
});
