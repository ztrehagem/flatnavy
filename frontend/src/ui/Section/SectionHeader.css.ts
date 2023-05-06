import { style } from "@vanilla-extract/css";
import { fgMuted } from "../../style/color.css.js";

export const root = style({
  display: "grid",
  gridTemplate: "auto / auto 1fr",
  gap: "8px",
  alignItems: "center",

  "::after": {
    height: "1px",
    width: "100%",
    borderBottom: `1px solid ${fgMuted}`,
    content: "",
  },
});

export const text = style({
  fontSize: "larger",
});
