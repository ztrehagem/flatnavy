import { style } from "@vanilla-extract/css";
import { fgMuted } from "../../style/color.css.js";

export const root = style({
  display: "grid",
  gridTemplate: "auto auto / 1fr",
  gap: "4px",
});

export const header = style({
  display: "grid",
  gridTemplate: "auto / auto 1fr auto",
  gap: "4px",
});

export const name = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  fontWeight: "bold",
});

export const handle = style({
  whiteSpace: "nowrap",
  color: fgMuted,
});

export const time = style({
  color: fgMuted,
});

export const body = style({
  lineHeight: "1.25",
});
