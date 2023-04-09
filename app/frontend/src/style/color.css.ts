import { createVar, globalStyle } from "@vanilla-extract/css";

export const light = createVar();
export const smoke = createVar();
export const slate = createVar();
export const dark = createVar();

export const darkNavy = createVar();
export const lightNavy = createVar();

globalStyle(":root", {
  vars: {
    [light]: "rgb(239 239 239)",
    [smoke]: "rgb(200 200 200)",
    [slate]: "rgb(64 64 64)",
    [dark]: "rgb(35 39 45)",

    [darkNavy]: "rgb(120 140 200)",
    [lightNavy]: "rgb(120 140 200)",
  },
});

export const fg = createVar();
export const fgWeak = createVar();
export const accent = createVar();
export const bgStrong = createVar();
export const bg = createVar();

globalStyle(":root", {
  vars: {
    [fg]: dark,
    [fgWeak]: slate,
    [accent]: lightNavy,
    [bgStrong]: smoke,
    [bg]: light,
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [fg]: light,
        [fgWeak]: smoke,
        [accent]: darkNavy,
        [bgStrong]: slate,
        [bg]: dark,
      },
    },
  },
});
