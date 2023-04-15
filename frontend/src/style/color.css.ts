import { createVar, globalStyle } from "@vanilla-extract/css";

export const light = createVar();
export const smoke = createVar();
export const slate = createVar();
export const dark = createVar();

export const darkNavy = createVar();
export const lightNavy = createVar();
// #1D5BE0 blue
// #4765A6 gray
// #6089E0 water

globalStyle(":root", {
  vars: {
    [light]: "rgb(239 239 239)",
    [smoke]: "rgb(200 200 200)",
    [slate]: "rgb(64 64 64)",
    [dark]: "rgb(35 39 45)",

    [darkNavy]: "#0D2761",
    [lightNavy]: "#133C94",
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
    [accent]: darkNavy,
    [bgStrong]: smoke,
    [bg]: light,
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [fg]: light,
        [fgWeak]: smoke,
        [accent]: lightNavy,
        [bgStrong]: slate,
        [bg]: dark,
      },
    },
  },
});
