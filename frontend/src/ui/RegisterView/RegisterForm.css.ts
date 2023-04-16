import { style } from "@vanilla-extract/css";
import { bgStrong } from "../../style/color.css.js";

export const form = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",
});

export const input = style({
  borderRadius: "99px",
  display: "inline-block",
  background: bgStrong,
  padding: "4px 12px",
});

export const submitButton = style({
  borderRadius: "99px",
  background: bgStrong,
  padding: "4px 12px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  cursor: "pointer",
});
